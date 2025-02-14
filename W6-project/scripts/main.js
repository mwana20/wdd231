// Fetch and display featured rooms
async function loadFeaturedRooms() {
    try {
        const response = await fetch('data/rooms.json');
        const rooms = await response.json();
        const featuredRooms = rooms.slice(0, 3); // Display first 3 rooms

        const container = document.getElementById('featured-rooms-container');
        featuredRooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.className = 'room-card';
            roomCard.innerHTML = `
                <img src="${room.image}" alt="${room.name}" class="animate-on-scroll">
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedRooms();
});