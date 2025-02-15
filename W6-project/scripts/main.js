async function loadFeaturedRooms() {
    try {
        const response = await fetch('./data/rooms.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json(); // Updated variable to match JSON structure
        const rooms = data.rooms; // Access the rooms array from the "rooms" key
        const container = document.getElementById('featured-rooms-container');
        container.innerHTML = '';

        // Populate the specified 'featured-rooms' section with room cards
        rooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.className = 'room-card';
            roomCard.innerHTML = `
                <img src="${room.image}" alt="${room.name}" class="room-image animate-on-scroll">
                <div class="room-info">
                    <h3>${room.name}</h3>
                    <p>${room.description}</p>
                    <p class="price">From $${room.price} per night</p>
                    <a href="rooms.html?id=${room.id}" class="cta-button">View Details</a>
                </div>
            `;
            container.appendChild(roomCard);
        });
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFeaturedRooms);

// Insert images into highlights section
document.getElementById('highlight-img-1').src = 'images/prime-location.jpg';
document.getElementById('highlight-img-2').src = 'images/luxury-amenities.jpg';
document.getElementById('highlight-img-3').src = 'images/24-7-service.jpg';
document.getElementById('highlight-img-4').src = 'images/free-wifi.jpg';
document.getElementById('highlight-img-5').src = 'images/exclusive-offers.jpg';
document.getElementById('highlight-img-6').src = 'images/pet-friendly.jpg';
