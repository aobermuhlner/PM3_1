

function getSelectedColleges() {
    const selectedCollegesDiv = document.getElementById('selectedColleges');
    const collegeBoxes = selectedCollegesDiv.getElementsByClassName('college-name-box');
    return Array.from(collegeBoxes).map(box => {
        return {
            nameCollege: box.textContent.trim().slice(0, -1),
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
    const amenityRelevance = getAmenityRelevance();
    const colleges = getSelectedColleges();
    const distanceKm = document.getElementById('distanceSlider').value;

    fetch('/colleges/get_college_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amenityRelevance: amenityRelevance,
            colleges: colleges,
            distance: distanceKm/10
        })
    })
    .then(response => response.json())
    .then(data => {
        updateLeaderboard(data); // Call function to update leaderboard
    })
    .catch(error => console.error('Error:', error));
}

// Leaderbaord setup
// Update leaderboard with college data
function updateLeaderboard(data) {
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = ''; // Clear existing content
    // Sort colleges by their total score in descending order
    data.sort((a, b) => b.collegeTotalScore - a.collegeTotalScore);

    // Create and append leaderboard entries
    data.forEach((college, index) => {
        const collegeDiv = document.createElement('div');
        collegeDiv.classList.add('leaderboard-entry');

        const collegeDetailsDiv = document.createElement('div');
        collegeDetailsDiv.classList.add('college-details', 'hidden');
        collegeDetailsDiv.innerHTML = `
            <div>Name: ${college.CollegeName}</div>
            <div>Score: ${college.collegeTotalScore.toFixed(2)}</div>
            <div>Latitude: ${college.lat}</div>
            <div>Longitude: ${college.lon}</div>
        `;

        collegeDiv.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="college-name">${college.CollegeName}</div>
            <div class="score">Score: ${college.collegeTotalScore.toFixed(2)}</div>
        `;
        collegeDiv.appendChild(collegeDetailsDiv);

        collegeDiv.addEventListener('click', () => {
            collegeDetailsDiv.classList.toggle('hidden');
        });

        leaderboardDiv.appendChild(collegeDiv);
    });

    // Select the first entry by default if it exists
    if (leaderboardDiv.firstChild) {
        selectCollegeEntry(leaderboardDiv.firstChild, data[0]);
    }
}

function selectCollegeEntry(element, collegeData) {
    // Remove 'selected' class from all entries
    document.querySelectorAll('.leaderboard-entry').forEach(entry => {
        entry.classList.remove('selected');
    });

    // Add 'selected' class to the clicked element
    element.classList.add('selected');

    // Prepare to extract data from the row
    console.log("Selected College:", collegeData);
    element.classList.add('selected');

    // Call functions to update the plots
    updateBarchartCategoryIframe(collegeData);
    console.log("got you")
    updateBarchartSelectedCategoryIframe(collegeData, 'fbs');
    updateBarchartSelectedCategoryIframe(collegeData, 'ecv');
    updateBarchartSelectedCategoryIframe(collegeData, 'pcs');
    updateBarchartSelectedCategoryIframe(collegeData, 'ths');
    updateScatterplotIframe(collegeData);
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchCollegeScore(); // Initial fetch and display of college scores
});