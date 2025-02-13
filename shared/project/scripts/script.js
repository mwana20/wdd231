// Add hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  initializeHamburgerMenu();

  const currentPage = window.location.pathname;
  if (currentPage.includes('rooms.html')) {
    initializeRooms();
  } else if (currentPage.includes('contact.html')) {
    initializeContact();
  } else if (currentPage.includes('gallery.html')) {
    initializeGallery();
  }

  // Fetch JSON data
  fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
      populateHotelData(data.hotel);
    })
    .catch(error => console.error('Error fetching JSON data:', error));

  // Function to populate hotel data
  function populateHotelData(hotel) {
    // Example: Populate hotel name and description
    document.getElementById('hotelName').textContent = hotel.name;
    document.getElementById('hotelDescription').textContent = hotel.description;

    // Example: Populate rooms
    const roomsContainer = document.getElementById('roomsContainer');
    hotel.rooms.forEach(room => {
      const roomElement = document.createElement('div');
      roomElement.classList.add('room');
      roomElement.innerHTML = `
        <h3>${room.type}</h3>
        <p>Price: $${room.price}</p>
        <p>Capacity: ${room.capacity} people</p>
        <p>Amenities: ${room.amenities.join(', ')}</p>
        <img src="${room.image}" alt="${room.type}">
      `;
      roomsContainer.appendChild(roomElement);
    });

    // Example: Populate contact information
    document.getElementById('contactPhone').textContent = hotel.contact.phone;
    document.getElementById('contactEmail').textContent = hotel.contact.email;
    document.getElementById('contactAddress').textContent = hotel.contact.address;
    document.getElementById('mapLocation').src = hotel.contact.mapLocation;
  }

  // Hamburger menu functionality
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navLinks = document.getElementById('navLinks');

  hamburgerMenu.addEventListener('click', function() {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
});