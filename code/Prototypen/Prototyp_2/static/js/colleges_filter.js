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
});