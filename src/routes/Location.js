import React, { useEffect } from 'react';
//import './App.css'; // You can create this CSS file for styling if needed
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import L from 'leaflet';

function Location() {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13); // Default location (London)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Check for geolocation support
    if ('geolocation' in navigator) {
      // Use Geolocation API to get user's location
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Create a marker at the user's location
        const userMarker = L.marker([userLat, userLng]).addTo(map);
        userMarker.bindPopup('Your Location').openPopup();

        // Center the map on the user's location
        map.setView([userLat, userLng], 13);
      });
    } else {
      alert('Geolocation is not available in your browser.');
    }
  }, []);

  return (
    <div className="App">
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default Location;
