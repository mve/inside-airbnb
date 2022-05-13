using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.repositories;

public class ListingRepository : IListingRepository
{
    private readonly DataContext _context;

    public ListingRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Listing>> GetAll(int take, int skip)
    {
        return await _context.Listings.Skip(skip).Take(take).ToListAsync();
    }

    public async Task<Listing?> Get(int id)
    {
        return await _context.Listings.Include(l => l.Reviews).FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<Listing?> Update(int id, Listing listingRequest)
    {
        var dbListing = await _context.Listings.FindAsync(id);

        if (dbListing == null)
        {
            return null;
        }

        dbListing.ListingUrl = listingRequest.ListingUrl;
        dbListing.ScrapeId = listingRequest.ScrapeId;
        dbListing.LastScraped = listingRequest.LastScraped;
        dbListing.Name = listingRequest.Name;
        dbListing.Summary = listingRequest.Summary;
        dbListing.Space = listingRequest.Space;
        dbListing.Description = listingRequest.Description;
        dbListing.ExperiencesOffered = listingRequest.ExperiencesOffered;
        dbListing.NeighborhoodOverview = listingRequest.NeighborhoodOverview;
        dbListing.Notes = listingRequest.Notes;
        dbListing.Transit = listingRequest.Transit;
        dbListing.Access = listingRequest.Access;
        dbListing.Interaction = listingRequest.Interaction;
        dbListing.HouseRules = listingRequest.HouseRules;
        dbListing.ThumbnailUrl = listingRequest.ThumbnailUrl;
        dbListing.MediumUrl = listingRequest.MediumUrl;
        dbListing.PictureUrl = listingRequest.PictureUrl;
        dbListing.XlPictureUrl = listingRequest.XlPictureUrl;
        dbListing.HostId = listingRequest.HostId;
        dbListing.HostUrl = listingRequest.HostUrl;
        dbListing.HostName = listingRequest.HostName;
        dbListing.HostSince = listingRequest.HostSince;
        dbListing.HostLocation = listingRequest.HostLocation;
        dbListing.HostAbout = listingRequest.HostAbout;
        dbListing.HostResponseTime = listingRequest.HostResponseTime;
        dbListing.HostResponseRate = listingRequest.HostResponseRate;
        dbListing.HostAcceptanceRate = listingRequest.HostAcceptanceRate;
        dbListing.HostIsSuperhost = listingRequest.HostIsSuperhost;
        dbListing.HostThumbnailUrl = listingRequest.HostThumbnailUrl;
        dbListing.HostPictureUrl = listingRequest.HostPictureUrl;
        dbListing.HostNeighbourhood = listingRequest.HostNeighbourhood;
        dbListing.HostListingsCount = listingRequest.HostListingsCount;
        dbListing.HostTotalListingsCount = listingRequest.HostTotalListingsCount;
        dbListing.HostVerifications = listingRequest.HostVerifications;
        dbListing.HostHasProfilePic = listingRequest.HostHasProfilePic;
        dbListing.HostIdentityVerified = listingRequest.HostIdentityVerified;
        dbListing.Street = listingRequest.Street;
        dbListing.Neighbourhood = listingRequest.Neighbourhood;
        dbListing.NeighbourhoodCleansed = listingRequest.NeighbourhoodCleansed;
        dbListing.NeighbourhoodGroupCleansed = listingRequest.NeighbourhoodGroupCleansed;
        dbListing.City = listingRequest.City;
        dbListing.State = listingRequest.State;
        dbListing.Zipcode = listingRequest.Zipcode;
        dbListing.Market = listingRequest.Market;
        dbListing.SmartLocation = listingRequest.SmartLocation;
        dbListing.CountryCode = listingRequest.CountryCode;
        dbListing.Country = listingRequest.Country;
        dbListing.Latitude = listingRequest.Latitude;
        dbListing.Longitude = listingRequest.Longitude;
        dbListing.IsLocationExact = listingRequest.IsLocationExact;
        dbListing.PropertyType = listingRequest.PropertyType;
        dbListing.RoomType = listingRequest.RoomType;
        dbListing.Accommodates = listingRequest.Accommodates;
        dbListing.Bathrooms = listingRequest.Bathrooms;
        dbListing.Bedrooms = listingRequest.Bedrooms;
        dbListing.Beds = listingRequest.Beds;
        dbListing.BedType = listingRequest.BedType;
        dbListing.Amenities = listingRequest.Amenities;
        dbListing.SquareFeet = listingRequest.SquareFeet;
        dbListing.Price = listingRequest.Price;
        dbListing.WeeklyPrice = listingRequest.WeeklyPrice;
        dbListing.MonthlyPrice = listingRequest.MonthlyPrice;
        dbListing.SecurityDeposit = listingRequest.SecurityDeposit;
        dbListing.CleaningFee = listingRequest.CleaningFee;
        dbListing.GuestsIncluded = listingRequest.GuestsIncluded;
        dbListing.ExtraPeople = listingRequest.ExtraPeople;
        dbListing.MinimumNights = listingRequest.MinimumNights;
        dbListing.MaximumNights = listingRequest.MaximumNights;
        dbListing.CalendarUpdated = listingRequest.CalendarUpdated;
        dbListing.HasAvailability = listingRequest.HasAvailability;
        dbListing.Availability30 = listingRequest.Availability30;
        dbListing.Availability60 = listingRequest.Availability60;
        dbListing.Availability90 = listingRequest.Availability90;
        dbListing.Availability365 = listingRequest.Availability365;
        dbListing.CalendarLastScraped = listingRequest.CalendarLastScraped;
        dbListing.NumberOfReviews = listingRequest.NumberOfReviews;
        dbListing.FirstReview = listingRequest.FirstReview;
        dbListing.LastReview = listingRequest.LastReview;
        dbListing.ReviewScoresRating = listingRequest.ReviewScoresRating;
        dbListing.ReviewScoresAccuracy = listingRequest.ReviewScoresAccuracy;
        dbListing.ReviewScoresCleanliness = listingRequest.ReviewScoresCleanliness;
        dbListing.ReviewScoresCheckin = listingRequest.ReviewScoresCheckin;
        dbListing.ReviewScoresCommunication = listingRequest.ReviewScoresCommunication;
        dbListing.ReviewScoresLocation = listingRequest.ReviewScoresLocation;
        dbListing.ReviewScoresValue = listingRequest.ReviewScoresValue;
        dbListing.RequiresLicense = listingRequest.RequiresLicense;
        dbListing.License = listingRequest.License;
        dbListing.JurisdictionNames = listingRequest.JurisdictionNames;
        dbListing.InstantBookable = listingRequest.InstantBookable;
        dbListing.IsBusinessTravelReady = listingRequest.IsBusinessTravelReady;
        dbListing.CancellationPolicy = listingRequest.CancellationPolicy;
        dbListing.RequireGuestProfilePicture = listingRequest.RequireGuestProfilePicture;
        dbListing.RequireGuestPhoneVerification = listingRequest.RequireGuestPhoneVerification;
        dbListing.CalculatedHostListingsCount = listingRequest.CalculatedHostListingsCount;
        dbListing.ReviewsPerMonth = listingRequest.ReviewsPerMonth;
        dbListing.Reviews = listingRequest.Reviews;

        await _context.SaveChangesAsync();

        return listingRequest;
    }

    public async Task<Listing> Create(Listing listing)
    {
        _context.Listings.Add(listing);
        await _context.SaveChangesAsync();

        return listing;
    }

    public async Task Delete(int id)
    {
        var dbListing = await _context.Listings.FindAsync(id);

        if (dbListing == null)
        {
            return;
        }

        _context.Listings.Remove(dbListing);
        await _context.SaveChangesAsync();
    }
}