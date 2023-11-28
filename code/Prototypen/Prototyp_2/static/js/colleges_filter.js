// This file will handle all the operations related to colleges filtering



// Add markers to the map for each college
function addMarkers(map, coordinates) {
    coordinates.forEach(coord => L.marker([coord.lat, coord.lon]).addTo(map));
}

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
              .bindPopup(college.name);
        });
    })
    .catch(error => {
        console.error("Error fetching colleges:", error);
    });
}

//export { addMarkers, fetchAndDisplayCollegesOnMap };
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
document.addEventListener('DOMContentLoaded', function() {
    populateCityFilter();

    document.getElementById('cityFilter').addEventListener('change', function() {
        const selectedCity = this.value;
        if (selectedCity) {
            addCity(selectedCity);
        }
        this.value = ''; // Reset the dropdown
    });

    document.getElementById('categoryFilter').addEventListener('change', function() {
        const selectedIndex = this.selectedIndex; // Get the index of the selected option
        const selectedOption = this.options[selectedIndex]; // Get the selected option element
        const selectedCollegeCategoryText = selectedOption.textContent; // Get the text content of the selected option

        if (selectedCollegeCategoryText) {
            addCollegeCategory(selectedCollegeCategoryText,this.value);
        }
        this.value = ''; // Reset the dropdown
    });

    /////////// FILTER BUTTON
    document.getElementById('filterCollegesBtn').addEventListener('click', function() {
        // Get selected categories and cities
        const selectedCategories = Array.from(document.querySelectorAll('#selectedCollegeCategories .college-box'))
            .map(box => box.getAttribute('data-category-value'))
        const selectedCities = Array.from(document.querySelectorAll('#selectedCities .city-box'))
            .map(box => box.childNodes[0].textContent.trim());

        // Prepare the data to be sent
        const data = {
            categories: selectedCategories,
            cities: selectedCities
        };

        // Fetch request to the server
        fetch('/colleges/get_colleges_filtered', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categories: selectedCategories, cities: selectedCities })
        })
        .then(response => response.json())
        .then(colleges => {
            const collegeNames = colleges.map(college => college.name);
            const uniqueColleges = [...new Set(collegeNames)];
            console.log(colleges); // Handle the response data
            displaySelectedColleges(uniqueColleges);
            updateMapWithColleges(colleges);
        })
        .catch(error => {
            console.error("Error fetching filtered colleges:", error);
        });
    });


});

//// Table for seleccted Colleges
function displaySelectedColleges(colleges) {
    const selectedCollegesDiv = document.getElementById('selectedColleges');
    selectedCollegesDiv.innerHTML = '';

    colleges.forEach(collegeName => {
        const collegeBox = document.createElement('div');
        collegeBox.className = 'college-name-box';
        collegeBox.textContent = collegeName;

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.className = 'close-button';
        closeButton.onclick = function() {
            selectedCollegesDiv.removeChild(collegeBox);

            // Remove the corresponding marker from the map
            if (collegeMarkersMap[collegeName]) {
                map.removeLayer(collegeMarkersMap[collegeName]);
                delete collegeMarkersMap[collegeName]; // Remove the reference
            }
        };

        collegeBox.appendChild(closeButton);
        selectedCollegesDiv.appendChild(collegeBox);
    });
}






//////////////////////////////city filter


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

function updateMapWithColleges(colleges) {
    // Clear existing markers
    for (let key in collegeMarkersMap) {
        map.removeLayer(collegeMarkersMap[key]);
    }
    collegeMarkersMap = {}; // Reset the markers map

    // Add new markers
    colleges.forEach(college => {
        if (college.lat && college.lon) {
            const marker = L.marker([college.lat, college.lon]).addTo(map)
                            .bindPopup(college.name);
            collegeMarkersMap[college.name] = marker; // Store marker by college name
        }
    });
}
