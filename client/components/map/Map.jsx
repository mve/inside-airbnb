import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXZhbmVnbW9uZCIsImEiOiJjbDJua2l6N3gweHp6M2luazRudnhvYjlvIn0.dhCIBfF6WJztCACIlu8FOQ';

const Map = () => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(4.90);
  const [lat, setLat] = useState(52.37);
  const [zoom, setZoom] = useState(10);
  const [listings, setListings] = useState(null);
  const [listingsGeoJson, setListingsGeoJson] = useState(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: 'mapbox://styles/mikevanegmond/cl3bie7v4000z14qoqq7xlr37',
      center: [lng, lat],
      zoom: zoom
    });

  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://localhost:7114/Listing/summary/all');
      setListings(response.data);
      setListingsGeoJson(formatGeoJson(response.data));
    }
    fetchData();
  }, []);

  useEffect(() => {
    map.current.on('load', () => {

      console.log("load");

      // Only add source if it doesn't exist already
      if (!map.current.getSource('listings')) {
        map.current.addSource('listings', {
          type: 'geojson',
          data: listingsGeoJson,
          cluster: true,
          clusterMaxZoom: 12, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points
        });
      }

      map.current.getSource('listings').setData(listingsGeoJson);

      // only add layer if it doesn't exist already
      if (!map.current.getLayer('clusters')) {

        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'listings',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#dbeafe',
              100,
              '#3b82f6',
              750,
              '#8b5cf6'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        // inspect a cluster on click
        map.current.on('click', 'clusters', (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          map.current.getSource('listings').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
              if (err) return;

              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            }
          );
        });

        map.current.on('mouseenter', 'clusters', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', 'clusters', () => {
          map.current.getCanvas().style.cursor = '';
        });

      }

      if (!map.current.getLayer('cluster-count')) {
        map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'listings',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });
      }

      if (!map.current.getLayer('unclustered-point')) {

        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'listings',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.current.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const name = e.features[0].properties.name;
          const hostname = e.features[0].properties.hostname;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<b>${name}</b><br>By ${hostname}`
          )
          .addTo(map.current);
        });

      }

    });
  }, [listingsGeoJson]);

  const formatGeoJson = (listings) => {

    return {
      type: 'FeatureCollection',
      features: listings.map(listing => {

        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(listing.longitude.toString().substring(0,
                1) + '.' + listing.longitude.toString().substring(1)),
              parseFloat(listing.latitude.toString().substring(0,
                2) + '.' + listing.latitude.toString().substring(2))
            ]
          },
          properties: {
            id: listing.id,
            name: listing.name,
            hostname: listing.hostName,
            neighbourhood: listing.neighbourhood,
            price: listing.price,
            numberOfReviews: listing.numberOfReviews,
          }
        }
      })
    };

  }

  return (
    <div className="relative">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container"/>
    </div>
  );

}

export default Map;
