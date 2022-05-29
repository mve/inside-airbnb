using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ListingController : ControllerBase
{
    private readonly IListingRepository _listingRepository;
    private readonly IDistributedCache _cache;

    public ListingController(IListingRepository listingRepository, IDistributedCache cache)
    // public ListingController(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
        _cache = cache;
    }

    // [HttpGet]
    // public async Task<ActionResult<List<Listing>>> Get([FromQuery] int take, [FromQuery] int skip)
    // {
    //     // Skip the first 50 listings and get the next 50.
    //     return Ok(await _listingRepository.GetAll(skip, take));
    // }

    [HttpGet]
    [Route("summary")]
    public async Task<ActionResult<List<ListingSummarized>>> Get([FromQuery] int take, [FromQuery] int skip)
    {
        string cacheKey = $"listings-{skip}-{take}";
        var cachedListings = await _cache.GetStringAsync(cacheKey);
        
        if (cachedListings != null)
        {
            return Ok(JsonConvert.DeserializeObject<List<ListingSummarized>>(cachedListings));
        }

        var listings = await _listingRepository.GetAllSummarized(take, skip);

        // TODO change to a longer cache time
        var cacheEntryOptions = new DistributedCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(30));
        
        // save listings in cache
        await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(listings), cacheEntryOptions);

        return Ok(listings);
    }

    [HttpGet]
    [Route("statistics")]
    [Authorize("read:statistics")]
    public async Task<ActionResult<List<ListingSummarized>>> Get()
    {
        return Ok("statistics"); // TODO implement
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<Listing>>> GetById(int id)
    {
        string cacheKey = $"listing-{id}";
        var cachedListing = await _cache.GetStringAsync(cacheKey);
        
        if (cachedListing != null)
        {
            Console.WriteLine("Cache hit");
            return Ok(JsonConvert.DeserializeObject<Listing>(cachedListing));
        }

        var listing = await _listingRepository.Get(id);

        if (listing == null)
        {
            return BadRequest("Listing not found.");
        }

        // // TODO change to a longer cache time
        var cacheEntryOptions = new DistributedCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(30));
        
        // save listing in cache
        await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(listing, Formatting.Indented,
            new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            }), cacheEntryOptions);

        return Ok(listing);
    }

    [HttpPost]
    public async Task<ActionResult<List<Listing>>> AddListing(Listing listing)
    {
        await _listingRepository.Create(listing);

        // TODO check if listing was created

        return Ok(listing);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<List<Listing>>> UpdateListing(int id, Listing listingRequest)
    {
        await _listingRepository.Update(id, listingRequest);

        return Ok(await _listingRepository.Get(id));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<Listing>>> DeleteListing(int id)
    {
        var dbListing = await _listingRepository.Get(id);
        if (dbListing == null)
        {
            return BadRequest("Listing not found.");
        }

        await _listingRepository.Delete(dbListing.Id);

        return Ok(dbListing);
    }
}