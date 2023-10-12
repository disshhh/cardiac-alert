/*// Map.js
import React, { useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import axios from 'axios';

function MapComponent() {
  useEffect(() => {
    // Create a map when the component mounts
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Define the Overpass query to fetch nearby hospitals
    const overpassQuery = `[out:json];
      node(around:1000)[amenity=hospital];
      out body;
    `;

    // Fetch hospital data from Overpass API
    axios
      .get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`)
      .then((response) => {
        // Parse the GeoJSON data
        const geojsonObject = response.data;

        // Create a vector source from the GeoJSON data
        const vectorSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(geojsonObject),
        });

        // Create a vector layer to display the hospitals
        const vectorLayer = new ol.layer.Vector({
          source: vectorSource,
        });

        // Add the vector layer to the map
        map.addLayer(vectorLayer);
      })
      .catch((error) => {
        console.error('Error fetching hospital data:', error);
      });

    // Cleanup when the component unmounts
    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default MapComponent;*/
// MapComponent.js
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


function HospitalLocator() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map
    const initialLocation = [51.505, -0.09]; // Default location (London)
    const mapInstance = L.map('map').setView(initialLocation, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);

    // Store the map instance in state
    setMap(mapInstance);

    // Check for geolocation support and get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Center the map on the user's location
        mapInstance.setView([userLat, userLng], 13);

        // Fetch nearby hospitals using the Overpass API
        const overpassQuery = `
          [out:json];
          node(around:1000,${userLat},${userLng})[amenity=hospital];
          out;
        `;

        fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: overpassQuery,
        })
          .then(response => response.json())
          .then(data => {
            // Process the response data and add hospital markers to the map
        
            const hospitals = data.elements;
            hospitals.forEach(hospital => {
              const lat = hospital.lat;
              const lon = hospital.lon;

              // Create a marker for each hospital and add it to the map
              const hospitalMarker = L.marker([lat, lon]).addTo(mapInstance);
              hospitalMarker.bindPopup(hospital.tags.name || 'Hospital');
            });
          })
          .catch(error => {
            console.error('Error fetching hospital data:', error);
          });
      });
    } else {
      alert('Geolocation is not available in your browser.');
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default HospitalLocator;
