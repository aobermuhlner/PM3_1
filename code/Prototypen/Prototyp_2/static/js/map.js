// This file will initialize the map and manage map-related functionalities

import { addMarkers, fetchAndDisplayCollegesOnMap } from './colleges_filter.js';

// Initialize the Leaflet map with Zurich as the starting point
var map = L.map('map').setView([47.3769, 8.5417], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Assuming you have already defined a blueIcon for Leaflet in this file or another imported file:
const blueIcon = L.icon({
    iconUrl: '../images/university.png',
    iconSize: [38, 35], // Size of the icon, [width, height]
    iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
});

document.addEventListener('DOMContentLoaded', function() {
    fetchAllUniqueColleges();
});

export { map, blueIcon };
