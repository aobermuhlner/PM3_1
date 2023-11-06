// This file could include functions and event listeners related to amenities filtering

// For illustration purposes, let's assume you have similar functionality for amenities as you do for colleges.
export function filterAmenities() {
    // Functionality to filter amenities goes here
}

function createAmenitiesSection(title, amenities) {
    // Create the main container for the amenities section
    const sectionContainer = document.createElement('div');

    // Create and append the header
    const header = document.createElement('h5');
    header.setAttribute('data-toggle', 'collapse');
    header.setAttribute('data-target', '#foodDrinkCollapse');
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', 'foodDrinkCollapse');
    header.style.cursor = 'pointer';
    header.innerHTML = `${title} <i class="bi bi-chevron-down"></i>`;
    sectionContainer.appendChild(header);

    // Create the collapse container
    const collapseContainer = document.createElement('div');
    collapseContainer.id = 'foodDrinkCollapse';
    collapseContainer.className = 'collapse';
    sectionContainer.appendChild(collapseContainer);

    // Function to create range inputs
    function createRangeInput(id, label) {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';

        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', id);
        labelElement.innerText = label;
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

        return formGroup;
    }

    // Loop through each amenity and append a range input to the collapse container
    amenities.forEach(amenity => {
        collapseContainer.appendChild(createRangeInput(amenity, amenity.charAt(0).toUpperCase() + amenity.slice(1)));
    });

    return sectionContainer;
}



//run scripts in the end
