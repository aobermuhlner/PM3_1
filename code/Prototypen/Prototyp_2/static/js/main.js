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
    console.log("DOMContentLoaded amenities event fired");
    loadHTML('/static/view/amenities_filter.html', 'amenities-filter-container', function() {
        var script = document.createElement('script');
        script.src = '/static/js/amenities_filter.js';
        document.body.appendChild(script);
    });
    loadHTML('/static/view/colleges_filter.html', 'colleges-filter-container', function() {
        var script = document.createElement('script');
        script.src = '/static/js/colleges_filter.js';
        document.body.appendChild(script);
    });
    loadHTML('/static/view/map.html', 'map-container', function() {
        var script = document.createElement('script');
        script.src = '/static/js/map.js';
        document.body.appendChild(script);
    });
    // Load other HTML files...
});