
// Function to update src for barchartcategory iframe
function updateBarchartCategoryIframe(params, containerId) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const parentParams = new URLSearchParams(window.parent.location.search);
    const category = parentParams.get('category');
    const limit = parentParams.get('limit');

    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=${category}&limit=${limit}&sortbycat=True`;
    console.log(iframeUrl);

    // Select the container based on the passed containerId
    const container = document.getElementById(containerId);
    // Find the iframe within this container and update its src
    const iframe = container.querySelector('#barchartcategory');
    if (iframe) {
        iframe.src = iframeUrl;
    }
}

// Function to update src for barchartselectedcategory iframe
function updateBarchartSelectedCategoryIframe(params, category, containerId) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const limit = new URLSearchParams(window.parent.location.search).get('limit');

    console.log(`Performed update for category ${category}`);
    let iframeUrl = `/static/view/bycatbarchart.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}&category=${category}&limit=${limit}&sortbycat=False`;

    // Select the container based on the passed containerId
    const container = document.getElementById(containerId);
    // Now find the iframe within this container and update its src
    const iframe = container.querySelector(`#barchartselectedcategory${category}`);
    if (iframe) {
        iframe.src = iframeUrl;
    }
}

// Function to update src for scatterplot iframe
function updateScatterplotIframe(params, containerId) {
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    // Modify the URL and parameters as needed for the scatterplot
    let iframeUrl = `/static/view/scatterplot_category_adjusted.html?latitude=${params.lat}&longitude=${params.lon}&distance_km=${distanceKm}`; // Add more parameters if needed

    // Select the container based on the passed containerId
    const container = document.getElementById(containerId);
    // Now find the iframe within this container and update its src
    const iframe = container.querySelector('#scatterplot');
    if (iframe) {
        iframe.src = iframeUrl;
    }
}
