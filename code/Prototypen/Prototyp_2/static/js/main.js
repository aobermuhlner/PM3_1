// Function to load HTML file into a target div
function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(html => document.getElementById(elementId).innerHTML = html)
        .catch(error => console.error('Error loading the HTML:', error));
}

// Load the external HTML files into their respective divs
document.addEventListener('DOMContentLoaded', function() {
    loadHTML('colleges_filter.html', 'colleges-filter-container');
    loadHTML('map.html', 'map-container');
    loadHTML('amenities_filter.html', 'amenities-filter-container');
});
