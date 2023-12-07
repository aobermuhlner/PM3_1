

function getSelectedColleges() {
    const selectedCollegesDiv = document.getElementById('selectedColleges');
    const collegeBoxes = selectedCollegesDiv.getElementsByClassName('college-name-box');
    return Array.from(collegeBoxes).map(box => {
        return {
            nameCollege: box.textContent.trim(),
            lat: parseFloat(box.getAttribute('data-lat')),
            lon: parseFloat(box.getAttribute('data-lon'))
        };
    });
}


function getAmenityRelevance() {
    let amenityRelevance = [];
    document.querySelectorAll('#dynamicAmenitiesContainer input[type=range]').forEach(input => {
        let amenity = input.id;
        let relevance = parseInt(input.value);
        amenityRelevance.push({ amenity, relevance });
    });
    return amenityRelevance;
}

function fetchCollegeScore() {
    // Assuming fetchNearbyAmenities function is already defined and returns an array of amenities
    const amenities = fetchNearbyAmenities(/* Parameters as needed */);
    const amenityRelevance = getAmenityRelevance();
    const colleges = getSelectedColleges();

    fetch('/get_college_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amenities: JSON.stringify(amenities),
            amenityRelevance: JSON.stringify(amenityRelevance),
            colleges: JSON.stringify(colleges)
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Process the returned data
    })
    .catch(error => console.error('Error:', error));
}

