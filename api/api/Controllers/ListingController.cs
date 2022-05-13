using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ListingController : ControllerBase
{
    private readonly IListingRepository _listingRepository;

    public ListingController(IListingRepository listingRepository)
    {
        _listingRepository = listingRepository;
    }

    [HttpGet]
    public async Task<ActionResult<List<Listing>>> Get([FromQuery] int take, [FromQuery] int skip)
    {
        // Skip the first 50 listings and get the next 50.
        return Ok(await _listingRepository.GetAll(skip, take));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<Listing>>> GetById(int id)
    {
        // var listing = await _context.Listings.FindAsync(id);

        var listing = await _listingRepository.Get(id);

        if (listing == null)
        {
            return BadRequest("Listing not found.");
        }

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