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
        sortByCat: parentParams.get('sortbycat') === 'True'
    };
}

// Function to update src for barchartcategory iframe
function updateBarchartCategoryIframe(params) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const parentParams = new URLSearchParams(window.parent.location.search);
    const category = parentParams.get('category')
    const limit = parentParams.get('limit')

    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.longitude}&distance_km=${distanceKm}&category=${category}&limit=${limit}&sortbycat=True`;
        console.log(iframeUrl);

    document.getElementById('barchartcategory').src = iframeUrl;
}

// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframefbs(params) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const parentParams = new URLSearchParams(window.parent.location.search);
    const limit = parentParams.get('limit')

    console.log("performed fbs")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=fbs&limit=${limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategoryfbs').src = iframeUrl;
}
// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframeecv(params) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const parentParams = new URLSearchParams(window.parent.location.search);
    const limit = parentParams.get('limit')

    console.log("performed ecv")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=ecv&limit=${limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategoryecv').src = iframeUrl;
}
// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframepcs(params) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const parentParams = new URLSearchParams(window.parent.location.search);
    const limit = parentParams.get('limit')

    console.log("performed pcs")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=pcs&limit=${limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategorypcs').src = iframeUrl;
}
// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframeths(params) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const parentParams = new URLSearchParams(window.parent.location.search);
    const limit = parentParams.get('limit')

    console.log("performed ths")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=ths&limit=${limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategoryths').src = iframeUrl;
}

// Function to update src for scatterplot iframe
function updateScatterplotIframe(params) {

    // Modify the URL and parameters as needed for the scatterplot
    let iframeUrl = `/static/view/scatterplot_category_adjusted.html?latitude=${params.lat}&longitude=${params.lon}`; // Add more parameters if needed
    document.getElementById('scatterplot').src = iframeUrl;
}

// Call these functions when the page loads
/*
window.addEventListener('load', function() {
    console.log('Load event detected from external file.');
    updateBarchartCategoryIframe();
    updateBarchartSelectedCategoryIframefbs();
    updateBarchartSelectedCategoryIframeecv();
    updateBarchartSelectedCategoryIframepcs();
    updateBarchartSelectedCategoryIframeths();
    updateScatterplotIframe();
    
});

*/

