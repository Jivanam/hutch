using HutchManager.Data.Entities;

namespace HutchManager.Models;

public class DataSource
{
  public string Id { get; set; } = string.Empty;
  public DateTimeOffset LastCheckin { get; set; }

  public List<Agent> Agents { get; set; } = new();

  public DataSource(Data.Entities.DataSource entity)
  {
    Id = entity.Id;
    LastCheckin = entity.LastCheckin;
    Agents = entity.Agents;

  }

  public DataSource()
  {
  }
}
