namespace api.Models;

public class ListingSummarized
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? HostName { get; set; }
    public string? Neighbourhood { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public string? Price { get; set; }
    public int? NumberOfReviews { get; set; }
}