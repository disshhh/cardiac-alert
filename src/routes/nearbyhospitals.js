/*import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import fs from 'fs';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 19.107567,
  lng: 72.8335
};

const saveHospitalsToFile = (hospitals) => {
  const jsonData = JSON.stringify(hospitals, null, 2);
  fs.writeFile('hospitals.json', jsonData, (err) => {
    if (err) {
      console.error('Error saving hospitals.json:', err);
    } else {
      console.log('Hospitals saved to hospitals.json');
    }
  });
};

const HospitalFinder = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 15
    });

    const request = {
      location: center,
      radius: 2000,
      type: ['hospital']
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
        saveHospitalsToFile(results);
      }
    });
  }, []);

  return (
    <div>
      <h1>Nearby Hospitals</h1>
      <div id="map" style={containerStyle}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {hospitals.map(hospital => (
            <Marker key={hospital.place_id} position={hospital.geometry.location} />
          ))}
        </GoogleMap>
      </div>

      <div>
        <h2>Hospital Information</h2>
        <ul>
          {hospitals.map(hospital => (
            <li key={hospital.place_id}>
              <strong>Name:</strong> {hospital.name}, <strong>Address:</strong> {hospital.vicinity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HospitalFinder;*/

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import overpass from 'overpass-frontend';

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

        // Query hospitals
        overpass
          .query(`node(around:1000,${userLat},${userLng})[amenity=hospital];out;`)
          .then(response => {
            // Process the response data and add hospital markers to the map
            const hospitals = response.features;
            hospitals.forEach(hospital => {
              const lat = hospital.geometry.coordinates[1];
              const lon = hospital.geometry.coordinates[0];

              // Create a marker for each hospital and add it to the map
              const hospitalMarker = L.marker([lat, lon]).addTo(mapInstance);
              hospitalMarker.bindPopup(hospital.properties.name);
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
