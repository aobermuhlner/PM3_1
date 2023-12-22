// Function to load HTML file into a target div
function loadHTML(url, containerId, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            if (callback) {
                callback();
            }
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });
}


/*
// Load the external HTML files into their respective divs
document.addEventListener('DOMContentLoaded', function() {
    loadHTML('/static/view/colleges_filter.html', 'colleges-filter-container');
    loadHTML('/static/view/map.html', 'map-container', function() {
        initMap(); // Call a function that initializes the map.
    });
    loadHTML('/static/view/amenities_filter.html', 'amenities-filter-container');
});
*/

document.addEventListener('DOMContentLoaded', function() {
    /*
    loadHTML('/static/view/amenities_filter.html', 'amenities-filter-container', function() {
        var script = document.createElement('script');
        script.src = '/static/js/amenities_filter.js';
        document.body.appendChild(script);
    });*/
    loadHTML('/static/view/coil.html', 'coil-container', function() {console.log('coil.html has been loaded into coil-container');});
  

    loadHTML('/static/view/map.html', 'map-container', function() {
        var script = document.createElement('script');
        script.src = '/static/js/map.js';
        document.body.appendChild(script);
    });
    // Load other HTML files...
});


// Function to create a custom icon
function createCustomIcon(iconUrl) {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
    });
}

// Creating custom icons
const entertainmentIcon = createCustomIcon('../static/images/entertainment_icon.png');
const foodIcon = createCustomIcon('../static/images/food_icon.png');
const healthIcon = createCustomIcon('../static/images/health_icon.png');
const postalIcon = createCustomIcon('../static/images/postal_icon.png');
const transportIcon = createCustomIcon('../static/images/transport_icon.png');

// Example of adding a marker with a custom icon
const amenityIcons = {
    ecv: entertainmentIcon,
    fbs: foodIcon,
    pcs: postalIcon,
    ths: transportIcon,
    other: healthIcon,
};

const universityIcon = L.icon({
        iconUrl: '../static/images/university.png', // Replace with the path to your university icon
        iconSize: [60, 60], // Size of the icon, adjust as needed
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -12] // Point from which the popup should open relative to the iconAnchor
    });