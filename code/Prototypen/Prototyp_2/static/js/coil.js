// script.js

console.log('Script is now running from an external file.');

// Function to extract URL parameters from the parent window
function getParamsFromParent() {
    const parentParams = new URLSearchParams(window.parent.location.search);
    return {
        latitude: 47.49652862548828, // Replace with parentParams.get('latitude') if needed
        longitude: 8.719242095947266, // Replace with parentParams.get('longitude') if needed
        distanceKm: 0.5, // Replace with parentParams.get('distance_km') if needed
        category: parentParams.get('category'),
        limit: parentParams.get('limit'),
        sortByCat: parentParams.get('sortbycat') === 'true'
    };
}

// Function to update src for barchartcategory iframe
function updateBarchartCategoryIframe() {
    const params = getParamsFromParent();
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.latitude}&longitude=${params.longitude}&distance_km=${params.distanceKm}&category=${params.category}&limit=${params.limit}&sortbycat=${params.sortByCat}`;
    document.getElementById('barchartcategory').src = iframeUrl;
}

// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframe() {
    const params = getParamsFromParent();
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.latitude}&longitude=${params.longitude}&distance_km=${params.distanceKm}&category=${params.category}&limit=${params.limit}&sortbycat=false`;
    document.getElementById('barchartselectedcategory').src = iframeUrl;
}

// Function to update src for scatterplot iframe
function updateScatterplotIframe() {
    const params = getParamsFromParent();
    // Modify the URL and parameters as needed for the scatterplot
    let iframeUrl = `/static/view/scatterplot_category_adjusted.html?latitude=${params.latitude}&longitude=${params.longitude}`; // Add more parameters if needed
    document.getElementById('scatterplot').src = iframeUrl;
}

// Call these functions when the page loads
window.addEventListener('load', function() {
    console.log('Load event detected from external file.');
    updateBarchartCategoryIframe();
    updateBarchartSelectedCategoryIframe();
    updateScatterplotIframe();
});
