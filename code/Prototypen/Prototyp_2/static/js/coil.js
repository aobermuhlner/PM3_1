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
function updateBarchartCategoryIframe() {
    const params = getParamsFromParent();
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.latitude}&longitude=${params.longitude}&distance_km=${params.distanceKm}&category=${params.category}&limit=${params.limit}&sortbycat=True`;
        console.log(iframeUrl);

    document.getElementById('barchartcategory').src = iframeUrl;
}

// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframefbs() {
    const params = getParamsFromParent();
    console.log("performed fbs")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.latitude}&longitude=${params.longitude}&distance_km=${params.distanceKm}&category=fbs&limit=${params.limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategoryfbs').src = iframeUrl;
}
// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframeecv() {
    const params = getParamsFromParent();
    console.log("performed ecv")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.latitude}&longitude=${params.longitude}&distance_km=${params.distanceKm}&category=ecv&limit=${params.limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategoryecv').src = iframeUrl;
}
// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframepcs() {
    const params = getParamsFromParent();
    console.log("performed pcs")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.latitude}&longitude=${params.longitude}&distance_km=${params.distanceKm}&category=pcs&limit=${params.limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategorypcs').src = iframeUrl;
}
// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframeths() {
    const params = getParamsFromParent();
    console.log("performed ths")
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.latitude}&longitude=${params.longitude}&distance_km=${params.distanceKm}&category=ths&limit=${params.limit}&sortbycat=False`;
    document.getElementById('barchartselectedcategoryths').src = iframeUrl;
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
    updateBarchartSelectedCategoryIframefbs();
    updateBarchartSelectedCategoryIframeecv();
    updateBarchartSelectedCategoryIframepcs();
    updateBarchartSelectedCategoryIframeths();
    updateScatterplotIframe();
    
});
