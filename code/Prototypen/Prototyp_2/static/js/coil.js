// script.js

// Function to update src for barchartcategory iframe
function updateBarchartCategoryIframe(params) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const parentParams = new URLSearchParams(window.parent.location.search);
    const category = parentParams.get('category')
    const limit = parentParams.get('limit')

    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=${category}&limit=${limit}&sortbycat=True`;
        console.log(iframeUrl);

    document.getElementById('barchartcategory').src = iframeUrl;
}

// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframe(params, category) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const limit = new URLSearchParams(window.parent.location.search).get('limit');

    console.log(`Performed update for category ${category}`);
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=${category}&limit=${limit}&sortbycat=False`;
    document.getElementById(`barchartselectedcategory${category}`).src = iframeUrl;
}

// Function to update src for scatterplot iframe
function updateScatterplotIframe(params) {

    // Modify the URL and parameters as needed for the scatterplot
    let iframeUrl = `/static/view/scatterplot_category_adjusted.html?latitude=${params.lat}&longitude=${params.lon}`; // Add more parameters if needed
    document.getElementById('scatterplot').src = iframeUrl;
}
