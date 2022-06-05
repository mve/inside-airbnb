namespace api.Models;

public class Statistics
{
    public List<TopHost> TopTenHosts { get; set; }
    public List<ListingsPerNeighbourhood> ListingsPerNeighbourhood { get; set; }
    public List<ResponseTime> ResponseTimes { get; set; }
    public int TopHosts { get; set; }
    public int TotalHosts { get; set; }
}

public class TopHost
{
    public int HostId { get; set; }
    public string HostName { get; set; } = "";
    public int Count { get; set; }
}

public class ListingsPerNeighbourhood
{
    public string Neighbourhood { get; set; } = "";
    public int Count { get; set; }
}

public class ResponseTime
{
    public string Time { get; set; } = "";
    public int Count { get; set; }
}