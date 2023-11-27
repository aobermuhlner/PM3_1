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
        inputElement.setAttribute('min', '1');
        inputElement.setAttribute('max', '5');
        inputElement.setAttribute('step', '1');
        inputElement.value = '3';
        formGroup.appendChild(inputElement);

        // Tooltip title
        var tooltipTitle = "Left: Not Interested | Center: Moderately Interested | Right: Very Interested";;

        // Initialize Bootstrap tooltip
        $(inputElement).tooltip({
            title: tooltipTitle,
            placement: 'top',
            trigger: 'hover'
        });

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
    var foodDrinkSection = createAmenitiesSection('Food & Drinks', foodDrinkAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(foodDrinkSection);

    // Entertainment & Culture
    var entertainmentCultureAmenities = ['arts_centre', 'casino', 'cinema', 'events_venue', 'music_venue', 'nightclub', 'theatre', 'library'];
    var entertainmentCultureSection = createAmenitiesSection('Entertainment & Culture', entertainmentCultureAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(entertainmentCultureSection);

    // Financial Services and Postal & Communication
    var financialPostalAmenities = ['atm', 'bank', 'post_box', 'post_office'];
    var financialPostalSection = createAmenitiesSection('Financial & Postal Services', financialPostalAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(financialPostalSection);

    // Transportation
    var transportationAmenities = ['bus_station', 'bicycle_parking', 'bicycle_repair_station'];
    var transportationSection = createAmenitiesSection('Transportation', transportationAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(transportationSection);

    // Health & Safety
    var healthSafetyAmenities = ['doctors', 'hospital', 'pharmacy', 'police'];
    var healthSafetySection = createAmenitiesSection('Health & Safety', healthSafetyAmenities);
    document.getElementById('dynamicAmenitiesContainer').appendChild(healthSafetySection);
});

//Checks if distance is changed of radius
document.getElementById('distanceSlider').addEventListener('input', function() {
    document.getElementById('distanceValue').textContent = this.value + " km";
});


$(document).ready(function() {
    var $distanceSlider = $('#distanceSlider');

    // Initialize the tooltip
    document.getElementById('distanceSlider').tooltip({
        title: function() {
            return $(this).val();
        },
        trigger: 'hover'
    });

    // Update the tooltip title on slider change
    $distanceSlider.on('input', function() {
        $(this).attr('data-original-title', $(this).val()).tooltip('show');
    });
});

