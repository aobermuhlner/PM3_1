
/* -------------------------------------
   Global Variables
------------------------------------- */
let collegeMarkersMap = {}; // Global map to store markers by college name

/* -------------------------------------
   College Filters and Map Update Functions
------------------------------------- */


/* --- Function to fetch and display colleges on the map  ---- */
function fetchAndDisplayCollegesOnMap(map, blueIcon) {
    const collegeNames = Array.from(document.querySelectorAll("#universityTableBody td:first-child")).map(td => td.textContent);

    fetch('/colleges/get_colleges_by_names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ college_names: collegeNames })
    })
    .then(response => response.json())
    .then(colleges => {
        // Clear previous markers from the Leaflet map
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add new markers for each college
        colleges.forEach(college => {
            L.marker([college.lat, college.lon], {icon: blueIcon}).addTo(map)
              .bindPopup(college.label);
        });
    })
    .catch(error => {
        console.error("Error fetching colleges:", error);
    });
}

/* --- Function to populate city filter dropdown --- */
function populateCityFilter() {
    fetch('/colleges/get_all_unique_cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(cities => {
        const cityFilter = document.getElementById('cityFilter');
        cityFilter.innerHTML = '<option value="">Select City</option>'; // Reset the dropdown

        // Populate the dropdown with cities
        cities.forEach(city => {
            if(city) { // Check to avoid adding empty values
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                cityFilter.appendChild(option);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching cities:", error);
    });
}

/* --- Function to display selected colleges --- */
function displaySelectedColleges(colleges) {
    const selectedCollegesDiv = document.getElementById('selectedColleges');
    selectedCollegesDiv.innerHTML = '';

    colleges.forEach(college => {
        const collegeBox = document.createElement('div');
        collegeBox.className = 'college-name-box';
        collegeBox.textContent = college.label; // Display the name of the college

        // Store latitude and longitude as data attributes
        collegeBox.setAttribute('data-lat', college.lat);
        collegeBox.setAttribute('data-lon', college.lon);

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.className = 'close-button';
        closeButton.onclick = function() {
            selectedCollegesDiv.removeChild(collegeBox);

            // Remove the corresponding marker from the map
            if (collegeMarkersMap[college.label]) {
                removeCollegeMarker(college.label);
    /*            if (collegeMarkersMap[college.label]) {
                    console.log("Removing marker for:", college.label);
                    removeCollegeMarker(college.label);
                    delete collegeMarkersMap[college.label]; // Remove the reference
                } else {
                    console.log("Marker not found for:", college.label);
                }*/
            }
        };

        collegeBox.appendChild(closeButton);
        selectedCollegesDiv.appendChild(collegeBox);
    });
}

/* --- Function to add a new college marker --- */
function addCollegeMarker(collegeName, lat, lon) {
    const marker = L.marker([lat, lon]).bindPopup(collegeName);
    collegeMarkersMap[collegeName] = { lat, lon, marker };
    marker.addTo(map); // Assuming 'map' is your Leaflet map instance
}

/* --- Function to remove a college marker --- */
function removeCollegeMarker(collegeName) {
    const collegeInfo = collegeMarkersMap[collegeName];
    if (collegeInfo && collegeInfo.marker) {
        map.removeLayer(collegeInfo.marker); // Remove marker from the map
    }
    delete collegeMarkersMap[collegeName]; // Remove entry from the map
}

/* --- Function to update all markers on the map based on collegeMarkersMap --- */
function updateMapMarkers() {
    // First, clear all existing markers from the map
    for (const key in collegeMarkersMap) {
        if (collegeMarkersMap[key].marker) {
            map.removeLayer(collegeMarkersMap[key].marker);
        }
    }

    // Then, add back markers from the updated collegeMarkersMap
    for (const key in collegeMarkersMap) {
        const collegeInfo = collegeMarkersMap[key];
        collegeInfo.marker = L.marker([collegeInfo.lat, collegeInfo.lon]).bindPopup(key);
        collegeInfo.marker.addTo(map);
    }
}
/* --- Function to clear all non-base map layers --- */
function clearMap() {
    map.eachLayer(function(layer) {
        // Check if the layer is not the base map layer
        if (!layer._url) {  // Assuming base layers have an '_url' property (like tile layers)
            map.removeLayer(layer);
        }
    });
}

/* -------------------------------------
   City and College Category Management
------------------------------------- */

/* --- Function to add city to the selected cities list --- */
function addCity(city) {
    const selectedCitiesDiv = document.getElementById('selectedCities');

    // Check if the city is already added
    if (document.getElementById('city-' + city)) return;

    const cityBox = document.createElement('div');
    cityBox.className = 'city-box';
    cityBox.id = 'city-' + city;
    cityBox.textContent = city;

    const closeButton = document.createElement('span');
    closeButton.textContent = '×';
    closeButton.onclick = function() {
        selectedCitiesDiv.removeChild(cityBox);
    };

    cityBox.appendChild(closeButton);
    selectedCitiesDiv.appendChild(cityBox);
}

/* --- Function to add college category to the selected categories list--- */
function addCollegeCategory(collegeCategory, categoryValue) {
    const selectedCollegeCategoriesDiv = document.getElementById('selectedCollegeCategories');

    const collegeCategoryId = 'collegeCategory-' + collegeCategory;
    if (document.getElementById(collegeCategoryId)) return;

    const collegeBox = document.createElement('div');
    collegeBox.className = 'college-box';
    collegeBox.id = collegeCategoryId;
    collegeBox.textContent = collegeCategory;

    // Store the category value in a data attribute
    collegeBox.setAttribute('data-category-value', categoryValue);

    const closeButton = document.createElement('span');
    closeButton.textContent = '×';
    closeButton.onclick = function() {
        selectedCollegeCategoriesDiv.removeChild(collegeBox);
    };

    collegeBox.appendChild(closeButton);
    selectedCollegeCategoriesDiv.appendChild(collegeBox);
}

function addMarkers(map, coordinates) {
    coordinates.forEach(coord => L.marker([coord.lat, coord.lon]).addTo(map));
}

/* -------------------------------------
   DOM Content Loaded Event Listener
------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    // Populate filters
    populateCityFilter();

    // Event listener for city filter changes
    document.getElementById('cityFilter').addEventListener('change', function() {
        handleCityFilterChange(this);
    });

    // Event listener for category filter changes
    document.getElementById('categoryFilter').addEventListener('change', function() {
        handleCategoryFilterChange(this);
    });

    // Event listener for the filter button
    document.getElementById('filterCollegesBtn').addEventListener('click', handleFilterColleges);

});

/* -------------------------------------
   Event Handlers
------------------------------------- */
function handleCityFilterChange(filterElement) {
    const selectedCity = filterElement.value;
    if (selectedCity) {
        addCity(selectedCity);
    }
    filterElement.value = ''; // Reset the dropdown
}

function handleCategoryFilterChange(filterElement) {
    const selectedIndex = filterElement.selectedIndex;
    const selectedOption = filterElement.options[selectedIndex];
    const selectedCollegeCategoryText = selectedOption.textContent;

    if (selectedCollegeCategoryText) {
        addCollegeCategory(selectedCollegeCategoryText, filterElement.value);
    }
    filterElement.value = ''; // Reset the dropdown
}

function handleFilterColleges() {
    // Get selected categories and cities
    const selectedCategories = Array.from(document.querySelectorAll('#selectedCollegeCategories .college-box'))
        .map(box => box.getAttribute('data-category-value'));
    const selectedCities = Array.from(document.querySelectorAll('#selectedCities .city-box'))
        .map(box => box.childNodes[0].textContent.trim());

    fetchFilteredColleges(selectedCategories, selectedCities);
}


/* -------------------------------------
   Network Request Functions
------------------------------------- */
function fetchFilteredColleges(selectedCategories, selectedCities) {
    fetch('/colleges/get_colleges_filtered', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: selectedCategories, cities: selectedCities })
    })
    .then(response => response.json())
    .then(colleges => {
        displaySelectedColleges(colleges);
        updateMapWithColleges(colleges);
    })
    .catch(error => {
        console.error("Error fetching filtered colleges:", error);
    });
}

/* --- updates the Map with new changed colleges --- */
function updateMapWithColleges(colleges) {
    // Clear existing markers
    clearMap();
    for (let key in collegeMarkersMap) {
        if (collegeMarkersMap[key].marker) {
            map.removeLayer(collegeMarkersMap[key].marker);
        }
    }
    collegeMarkersMap = {}; // Reset the markers map

    // Add new markers
    colleges.forEach(college => {
        if (college.lat && college.lon) {
            // Create a new marker
            const marker = L.marker([college.lat, college.lon]).bindPopup(college.label);
            marker.addTo(map);

            // Store marker along with lat and lon in collegeMarkersMap
            collegeMarkersMap[college.label] = {
                lat: college.lat,
                lon: college.lon,
                marker: marker
            };
        }
    });
}

/* -------------------------------------
   College Selection and Mutation Handling
------------------------------------- */
function onSelectedCollegesChanged() {
    console.log("onSelectedCollegesChanged")
    const items = selectedCollegesDiv.querySelectorAll('.college-name-box');
    if (items.length > 0) {
        items.forEach(item => {
            const latitude = item.getAttribute('data-lat');
            const longitude = item.getAttribute('data-lon');
            // You might want to aggregate these coordinates or choose one
            getNearbyAmenities(latitude, longitude);
        });
    }
}
