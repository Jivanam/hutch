using Microsoft.AspNetCore.Identity;

namespace HutchManager.Data.Entities.Identity;

public class ApplicationUser : IdentityUser
{
  [PersonalData]
  public string FullName { get; set; } = string.Empty;

  [PersonalData]
  public string UICulture { get; set; } = string.Empty;

  public bool AccountConfirmed { get; set; }
}
