import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = ({listingsGeoJson, setSelectedListingId}) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(4.90);
  const [lat, setLat] = useState(52.37);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
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
    if (map.current.getSource('listings')) {
      map.current.getSource('listings').setData(listingsGeoJson);
    }
  }, [listingsGeoJson]);

  useEffect(() => {
    map.current.on('load', () => {

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
          const price = e.features[0].properties.price;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<b>${name}</b><br>By ${hostname}<br>Price: ??? ${price}`
          )
          .addTo(map.current);

          setSelectedListingId(e.features[0].properties.id);

        });

      }

    });
  }, [listingsGeoJson]);

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
