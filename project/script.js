// Add hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

// Initialize page-specific functions
function initializeRooms() {
  console.log('Rooms page initialized');
}

function initializeContact() {
  console.log('Contact page initialized');
}

function initializeGallery() {
  console.log('Gallery page initialized');
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  } else {
    console.warn('AOS library is not loaded');
  }

  initializeHamburgerMenu();

  const currentPage = window.location.pathname;
  if (currentPage.includes('rooms.html')) {
    initializeRooms();
  } else if (currentPage.includes('contact.html')) {
    initializeContact();
  } else if (currentPage.includes('gallery.html')) {
    initializeGallery();
  }
});
