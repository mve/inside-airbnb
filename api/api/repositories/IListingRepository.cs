using api.Models;

namespace api.repositories;

public interface IListingRepository
{
    Task<IEnumerable<Listing>> GetAll(int take, int skip);
    Task<Listing?> Get(int id);
    Task<Listing?> Update(int id, Listing listingRequest);
    Task<Listing> Create(Listing listing);
    Task Delete(int id);
}