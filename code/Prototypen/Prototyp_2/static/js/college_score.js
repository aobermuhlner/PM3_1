

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
        console.log(data)
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
        collegeDiv.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="college-name">${college.CollegeName}</div>
            <div class="score">Score: ${college.collegeTotalScore.toFixed(2)}</div>
        `;
        leaderboardDiv.appendChild(collegeDiv);
    });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchCollegeScore(); // Initial fetch and display of college scores
});