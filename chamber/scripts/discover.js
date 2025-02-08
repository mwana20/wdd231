document.addEventListener('DOMContentLoaded', () => {
    // Handle last visit message
    const messageElement = document.getElementById('lastVisitMessage');
    if (messageElement) {
        const lastVisit = localStorage.getItem('lastVisit');
        const currentDate = Date.now();

        if (!lastVisit) {
            messageElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const daysSinceLastVisit = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
            messageElement.textContent = daysSinceLastVisit < 1
                ? "Back so soon! Awesome!"
                : `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
        }
        localStorage.setItem('lastVisit', currentDate.toString());
    }

    // Fetch and populate locations from JSON
    const container = document.querySelector('.locations-grid');
    if (container) {
        fetch('data/locations.json')
            .then(response => response.json())
            .then(data => {
                container.innerHTML = ''; // Clear existing content
                data.locations.forEach(location => {
                    const card = document.createElement('div');
                    card.classList.add('location-card');

                    let learnMoreLink = location.url ? `<a href="${location.url}" class="learn-more" target="_blank">Learn More</a>` : '';

                    card.innerHTML = `
                        <img src="${location.image}" alt="${location.title}">
                        <h2>${location.title}</h2>
                        <p>${location.description}</p>
                        <p><strong>Address:</strong> ${location.address}</p>
                        ${learnMoreLink}
                    `;
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Error loading locations:', error));
    }

    // Retrieve and display submitted form data (for Thank You page)
    const displayElements = [
        { id: "display-first-name", key: "firstName" },
        { id: "display-last-name", key: "lastName" },
        { id: "display-email", key: "email" },
        { id: "display-phone", key: "phone" },
        { id: "display-business-name", key: "businessName" },
        { id: "display-timestamp", key: "timestamp", defaultValue: new Date().toLocaleString() }
    ];

    displayElements.forEach(({ id, key, defaultValue = "N/A" }) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = localStorage.getItem(key) || defaultValue;
        }
    });

    // Handle hamburger menu toggle
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navLinks = document.getElementById("navLinks");

    hamburgerMenu.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});
