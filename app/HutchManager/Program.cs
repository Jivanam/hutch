using ClacksMiddleware.Extensions;
using HutchManager.Auth;
using HutchManager.Config;
using HutchManager.Constants;
using HutchManager.Data;
using HutchManager.Data.Entities.Identity;
using HutchManager.Extensions;
using HutchManager.HostedServices;
using HutchManager.Middleware;
using HutchManager.OptionsModels;
using HutchManager.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.FeatureManagement;
using Serilog;
using UoN.AspNetCore.VersionMiddleware;

var b = WebApplication.CreateBuilder(args);

b.Host.UseSerilog((context, services, loggerConfig) => loggerConfig
  .ReadFrom.Configuration(context.Configuration)
  .Enrich.FromLogContext());

#region Configure Services

// default missing Feature Flags to false, to "declare" them
b.Configuration.AddInMemoryCollection(
  Enum.GetNames<FeatureFlags>()
    .Where(flagName =>
      b.Configuration.GetSection("FeatureManagement").GetChildren().All(
        flagConfigKey => flagConfigKey.Key != flagName))
    .Select(flagName => new KeyValuePair<string, string>($"FeatureManagement:{flagName}", "false")));

// MVC
b.Services
  .AddControllersWithViews()
  .AddJsonOptions(DefaultJsonOptions.Configure);

// EF
b.Services
  .AddDbContext<ApplicationDbContext>(o =>
  {
    // migration bundles don't like null connection strings (yet)
    // https://github.com/dotnet/efcore/issues/26869
    // so if no connection string is set we register without one for now.
    // if running migrations, `--connection` should be set on the command line
    // in real environments, connection string should be set via config
    // all other cases will error when db access is attempted.
    var connectionString = b.Configuration.GetConnectionString("Default");
    if (string.IsNullOrWhiteSpace(connectionString))
      o.UseNpgsql();
    else
      o.UseNpgsql(connectionString,
        o => o.EnableRetryOnFailure());
  });

// Identity
b.Services
  .AddIdentity<ApplicationUser, IdentityRole>()
  .AddClaimsPrincipalFactory<CustomClaimsPrincipalFactory>()
  .AddEntityFrameworkStores<ApplicationDbContext>()
  .AddDefaultTokenProviders();


b.Services
  .AddApplicationInsightsTelemetry()
  .ConfigureApplicationCookie(AuthConfiguration.IdentityCookieOptions)
  .AddAuthorization(AuthConfiguration.AuthOptions)
  .Configure<RabbitJobQueueOptions>(b.Configuration.GetSection("JobQueue"))
  .Configure<RQuestTaskApiOptions>(b.Configuration.GetSection("RQuestTaskApi"))
  .Configure<ActivitySourcePollingOptions>(b.Configuration.GetSection("ActivitySourcePolling"))
  .Configure<DistributionPollingOptions>(b.Configuration.GetSection("DistributionPolling"))
  .Configure<RegistrationOptions>(b.Configuration.GetSection("UserAccounts"))
  .Configure<LoginOptions>(b.Configuration.GetSection("UserAccounts"))
  .AddEmailSender(b.Configuration)
  .AddJobQueue(b.Configuration)
  .AddTransient<UserService>()
  .AddTransient<FeatureFlagService>()
  .AddTransient<ActivitySourceService>()
  .AddTransient<DataSourceService>()
  .AddTransient<ResultsModifierService>()
  .AddTransient<AgentService>()
  .AddHostedService<ActivitySourcePollingHostedService>()
  .AddScoped<RquestAvailabilityPollingService>()
  .AddHostedService<DistributionPollingHostedService>()
  .AddScoped<RquestDistributionPollingService>()
  .AddFeatureManagement();
b.Services
  .AddHttpClient<RQuestTaskApiClient>();
#endregion

var app = b.Build();

// Do data seeding isolated from the running of the app
using (var scope = app.Services.CreateScope())
{
  var db = scope.ServiceProvider
    .GetRequiredService<ApplicationDbContext>();

  var dataSeeder = new DataSeeder(db);

  await dataSeeder.SeedSourceTypes();
  await dataSeeder.SeedModifierTypes();

  await UserDataSeeder.Seed(scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>(),
    scope.ServiceProvider.GetRequiredService<IPasswordHasher<ApplicationUser>>(),
    scope.ServiceProvider.GetRequiredService<IConfiguration>());
}

#region Configure Pipeline
app.UseSerilogRequestLogging();
app.GnuTerryPratchett();

if (!app.Environment.IsDevelopment())
{
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseVersion();
app.UseConfigCookieMiddleware();

#endregion

#region Endpoint Routing

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Endpoints

app.MapControllers();

app.MapFallbackToFile("index.html").AllowAnonymous();

#endregion

app.Run();
