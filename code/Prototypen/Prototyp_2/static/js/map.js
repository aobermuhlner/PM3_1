// This file will initialize the map and manage map-related functionalities
//
//

//import { addMarkers, fetchAndDisplayCollegesOnMap } from './colleges_filter.js';

// Initialize the Leaflet map with Zurich as the starting point
var map = L.map('map').setView([47.3769, 8.5417], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const blueIcon = L.icon({
    iconUrl: '../images/university.png',
    iconSize: [38, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

function initMap() {
    var map = L.map('map').setView([47.3769, 8.5417], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([47.3769, 8.5417], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const blueIcon = L.icon({
        iconUrl: '../images/university.png',
        iconSize: [38, 35],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });

    fetchAllUniqueColleges();
});


//export { map, blueIcon };
