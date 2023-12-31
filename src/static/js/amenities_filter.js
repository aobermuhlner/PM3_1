// This file could include functions and event listeners related to amenities filtering

// For illustration purposes, let's assume you have similar functionality for amenities as you do for colleges.
//export function filterAmenities() {
    // Functionality to filter amenities goes here
//}



function createAmenitiesSection(sectionName, amenities) {
    const sectionId = sectionName.replace(/\s+/g, '') + 'Collapse'; // Create a unique ID for the section
    // Create the main container for the amenities section
    const sectionContainer = document.createElement('div');

    const header = document.createElement('h4');
    header.setAttribute('data-toggle', 'collapse');
    header.setAttribute('data-target', `#${sectionId}`);
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', sectionId);
    header.style.cursor = 'pointer';

    // Add title text to the header
    const headerText = document.createTextNode(`${sectionName} `);
    header.appendChild(headerText);

    // Create and append the icon to the header
    const icon = document.createElement('i');
    icon.className = 'bi bi-chevron-down';
    header.appendChild(icon);

    // Append the header to the section container
    sectionContainer.appendChild(header);

    // Create the collapse container
    const collapseContainer = document.createElement('div');
    collapseContainer.id = sectionId;
    collapseContainer.className = 'collapse';
    sectionContainer.appendChild(collapseContainer);

    // Add click event listener to the header to toggle the collapse container
    header.addEventListener('click', function() {
        toggleCollapse(sectionId, icon);
    });

    // Function to create range inputs
    function createRangeInput(id, label) {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';

        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', id);
        labelElement.innerText = formatLabelText(label); // Use formatted text
        formGroup.appendChild(labelElement);

        const inputElement = document.createElement('input');
        inputElement.type = 'range';
        inputElement.className = 'form-control-range';
        inputElement.id = id;
        inputElement.setAttribute('min', '0');
        inputElement.setAttribute('max', '4');
        inputElement.setAttribute('step', '1');
        inputElement.value = '2';

        // Set the data-tooltip attribute for custom tooltip
        inputElement.setAttribute('data-tooltip', 'Left: Not Interested | Center: Moderately Interested | Right: Very Interested');

        formGroup.appendChild(inputElement);

        return formGroup;
    }


    // Loop through each amenity and append a range input to the collapse container
    amenities.forEach(amenity => {
        const amenityId = amenity.replace(/\s+/g, '');
        collapseContainer.appendChild(createRangeInput(amenityId, amenity));
    });

    return sectionContainer;
}

function formatLabelText(text) {
    return text.split('_')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
}
function toggleCollapse(sectionId, icon) {
    const collapseSection = document.getElementById(sectionId);
    if (collapseSection.style.display === 'none' || collapseSection.style.display === '') {
        collapseSection.style.display = 'block';
        icon.className = 'bi bi-chevron-up'; // Change icon to chevron-up
    } else {
        collapseSection.style.display = 'none';
        icon.className = 'bi bi-chevron-down'; // Change icon to chevron-down
    }
}


////////////////////////////////////////////////////////////////
// Functions called for HTML FILE
document.addEventListener('DOMContentLoaded', function() {
    // Food & Drink
    var foodDrinkAmenities = ['bar', 'cafe', 'fast_food', 'food_court', 'restaurant', 'pub'];
    var foodDrinkSection = createAmenitiesSection('Food and Beverage Services', foodDrinkAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(foodDrinkSection);

    // Entertainment & Culture
    var entertainmentCultureAmenities = ['arts_centre', 'casino', 'cinema', 'events_venue', 'music_venue', 'nightclub', 'theatre'];
    var entertainmentCultureSection = createAmenitiesSection('Entertainment and Cultural Venues', entertainmentCultureAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(entertainmentCultureSection);

    // Financial Services and Postal & Communication
    var financialPostalAmenities = ['atm', 'bank', 'post_box', 'post_office', 'library'];
    var financialPostalSection = createAmenitiesSection('Public and Civil Services', financialPostalAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(financialPostalSection);

    // Transportation
    var transportationAmenities = ['bus_station', 'bicycle_parking', 'bicycle_repair_station', 'doctors', 'hospital', 'pharmacy', 'police'];
    var transportationSection = createAmenitiesSection('Transportation and Health Services', transportationAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(transportationSection);

    // Event listener for the "Show Amenities" button
    document.getElementById('showAmenitiesBtn').addEventListener('click', function() {
        showSelectedCollegesAmenities();
    });

    function updateTooltip() {
        distanceSlider.setAttribute('data-tooltip', distanceSlider.value/10 + ' km');
    }
    // Initialize the tooltip with the current value
    updateTooltip();
    // Event listener for changes in the range slider
    distanceSlider.addEventListener('input', updateTooltip);

});


function showSelectedCollegesAmenities() {
    const selectedCollegesDiv = document.getElementById('selectedColleges');
    const items = selectedCollegesDiv.querySelectorAll('.college-name-box');
    const distanceKm = document.getElementById('distanceSlider').value / 10;
    const amenityPromises = [];
    const colleges = [];

    // Collect college data and fetch amenities
    items.forEach(item => {
        const lat = item.getAttribute('data-lat');
        const lon = item.getAttribute('data-lon');
        const label = item.textContent;

        if (lat && lon) {
            colleges.push({ label, lat, lon });
            amenityPromises.push(fetchNearbyAmenities(lat, lon, distanceKm));
        }
    });

    // Clear map and display colleges
    clearMap();
    updateMapWithColleges(colleges);

    // Fetch and display amenities
    Promise.all(amenityPromises).then(results => {
        const allAmenities = results.flat(); // Flatten the array of results
        addUniqueAmenitiesToMap(allAmenities); // Function to add unique amenities to map
    });
}


function fetchNearbyAmenities(latitude, longitude, distanceKm) {
    return new Promise((resolve, reject) => {
        // Prepare form data
        const formData = new FormData();
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('distance_km', distanceKm);

        // Fetch request with form data
        fetch('/amenities/get_amenitites_nearby', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
}

function addUniqueAmenitiesToMap(amenities) {
    const uniqueAmenities = new Set();
    amenities.forEach(amenity => {
        const amenityKey = `${amenity.lat}-${amenity.lon}`; // Unique key for each amenity
        if (!uniqueAmenities.has(amenityKey)) {
            uniqueAmenities.add(amenityKey);
            if (amenity.lat && amenity.lon) {
                // Determine the correct icon for the amenity category
                const icon = amenityIcons[amenity.category]; // Use a default icon if category is not found
                const newLabel = (amenity.amenity).replace(/-_/g, ' ').replace(/\b(\w)/g, function(match, firstLetter) {
                    return firstLetter.toUpperCase();
                });
                const labelText = "(" + newLabel + ") - " + amenity.name
                const amenityMarker = L.marker([amenity.lat, amenity.lon], {icon: icon}).bindPopup(labelText);
                amenityMarker.addTo(map); // Assuming 'map' is your Leaflet map instance
            }
        }
    });
}
