import Head from 'next/head'
import NavBar from '../components/core/NavBar'
import Footer from '../components/core/Footer'
import Map from '../components/map/map';
import Admin from '../components/admin/admin';
import { Auth0Provider } from "@auth0/auth0-react";
import Filters from '../components/map/Filters';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SelectedListing from '../components/core/SelectedListing';

export default function Home() {

  const [filters, setFilters] = useState({
    priceFilter: 250,
    neighbourhoodFilter: '',
    reviewsFilter: 0
  });

  const [listings, setListings] = useState([]);
  const [listingsGeoJson, setListingsGeoJson] = useState(null);
  const [filterOptions, setFilterOptions] = useState({maxPrice: 0, neighbourhoods: [''], maxReviews: 0});
  const [selectedListingId, setSelectedListingId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/Listing/summary/all`);

      setListings(formatListings(response.data));
      setListingsGeoJson(formatGeoJson(formatListings(response.data)));
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilterOptions({
      maxPrice: listings.reduce((max, listing) => Math.max(max, listing.price), 0),
      neighbourhoods: listings.reduce((neighbourhoods, listing) => {
        if (!neighbourhoods.includes(listing.neighbourhood)) {
          neighbourhoods.push(listing.neighbourhood);
        }
        return neighbourhoods;
      }, []),
      maxReviews: listings.reduce((max, listing) => Math.max(max, listing.numberOfReviews), 0)
    });
  }, [listings]);

  useEffect(() => {
    console.log("formatting geojson...");
    setListingsGeoJson(formatGeoJson(listings));
    console.log(listingsGeoJson);
    console.log("done formatting geojson...");

  }, [listings, filters]);

  const formatListings = (listings) => {

    return listings.map(listing => {

      let formattedPrice = listing.price.replace(/[^0-9]/g, '');
      formattedPrice = parseInt(formattedPrice.substring(0, formattedPrice.length - 2));

      return {
        id: listing.id,
        name: listing.name,
        hostname: listing.hostName,
        neighbourhood: listing.neighbourhood,
        price: formattedPrice,
        numberOfReviews: listing.numberOfReviews,
        latitude: parseFloat(listing.latitude.toString().substring(0,
          2) + '.' + listing.latitude.toString().substring(2)),
        longitude: parseFloat(listing.longitude.toString().substring(0,
          1) + '.' + listing.longitude.toString().substring(1)),
      }
    });
  }

  const formatGeoJson = (listings) => {

    listings = listings.filter(listing => {
      return listing.price <= filters.priceFilter &&
        listing.numberOfReviews >= filters.reviewsFilter &&
        (listing.neighbourhood.toLowerCase().includes(filters.neighbourhoodFilter.toLowerCase()) || filters.neighbourhoodFilter === '');
    });

    return {
      type: 'FeatureCollection',
      features: listings.map(listing => {

        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              listing.longitude,
              listing.latitude
            ]
          },
          properties: {
            id: listing.id,
            name: listing.name,
            hostname: listing.hostname,
            neighbourhood: listing.neighbourhood,
            price: listing.price,
            numberOfReviews: listing.numberOfReviews,
          }
        }

      })
    };

  }


  return (
    <div>
      <Head>
        <title>Inside Airbnb</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <NavBar/>

      <main className="container mx-auto grid grid-cols-3">

        {
          listingsGeoJson &&
          <div className="col-span-2">
            <Map listingsGeoJson={listingsGeoJson} setSelectedListingId={setSelectedListingId}/>
            <SelectedListing selectedListingId={selectedListingId}/>
          </div>
        }

        <div className="pl-4">
          <Filters setFilters={setFilters} maxPrice={filterOptions.maxPrice} neighbourhoods={filterOptions.neighbourhoods} maxReviews={filterOptions.maxReviews}/>

          <Auth0Provider
            domain="dev-q9qzn2lm.us.auth0.com"
            clientId="5eDc8JhFc7TylAQiiyFRnaW38VL4Qmrb"
            redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
            scope="read:statistics"
            audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
          >
            <Admin/>
          </Auth0Provider>
        </div>

      </main>

      <Footer/>
    </div>
  )
}
