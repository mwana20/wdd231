const spotlightsContainer = document.getElementById('spotlights-container');

// Fetch members data
async function getSpotlightData() {
    try {
        const response = await fetch('data/members.json'); // Make sure the path is correct
        if (!response.ok) throw new Error("Failed to load members.json");

        const data = await response.json();
        const members = Array.isArray(data) ? data : data.members;

        displaySpotlights(members);
    } catch (error) {
        console.error("Load error:", error);
    }
}

// Filter and select random members
function getRandomMembers(members, count) {
    const eligibleMembers = members.filter(member => member.membershipLevel >= 2);
    return eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Display spotlights
function displaySpotlights(members) {
    if (!spotlightsContainer) {
        console.error("Spotlights container not found!");
        return;
    }

    const spotlightMembers = getRandomMembers(members, 3);

    spotlightMembers.forEach(member => {
        const spotlight = document.createElement('section');
        spotlight.className = 'spotlight-card';

        const membershipTitle = member.membershipLevel === 3 ? 'Gold' : 'Silver';

        spotlight.innerHTML = `
            <div class="spotlight-content">
                <h4>${member.name}</h4>
                <img src="images/${member.image}" alt="${member.name} logo" width="150" onerror="this.src='https://via.placeholder.com/150'">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p class="membership">${membershipTitle} Member</p>
                <p class="link">Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>
        `;
        spotlightsContainer.appendChild(spotlight);
    });
}

// Load data on page load
getSpotlightData();