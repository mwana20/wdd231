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

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedRooms();
    setupSlideshows();
});

function setupSlideshows() {
    const slideshowsData = {
        'honeymoon-slideshow': [
            { src: 'images/Romantic dinner.jpg', alt: 'Honeymoon 1' },
            { src: 'images/Couples spa.jpg', alt: 'Honeymoon 2' },
            { src: 'images/Late checkout.jpg', alt: 'Honeymoon 3' },
            { src: 'images/honeymoon4.jpg', alt: 'Honeymoon 4' }
        ],
        'business-slideshow': [
            { src: 'images/Business Package.jpg', alt: 'Business 1' },
            { src: 'images/Conference.jpg', alt: 'Business 2' },
            { src: 'images/internet.jpg', alt: 'Business 3' },
            { src: 'images/Business.jpg', alt: 'Business 4' }
        ]
    };

    Object.keys(slideshowsData).forEach(slideshowId => {
        const slideshowContainer = document.getElementById(slideshowId);
        const slides = slideshowsData[slideshowId];

        slides.forEach(slide => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide fade';
            slideDiv.innerHTML = `<img src="${slide.src}" alt="${slide.alt}">`;
            slideshowContainer.appendChild(slideDiv);
        });

        const prevButton = document.createElement('a');
        const nextButton = document.createElement('a');

        prevButton.className = 'prev';
        prevButton.innerHTML = '&#10094;';
        nextButton.className = 'next';
        nextButton.innerHTML = '&#10095;';

        slideshowContainer.appendChild(prevButton);
        slideshowContainer.appendChild(nextButton);

        let slideIndex = 0;

        function showSlides(n) {
            const slides = slideshowContainer.querySelectorAll('.slide');
            if (n >= slides.length) { slideIndex = 0 }
            if (n < 0) { slideIndex = slides.length - 1 }
            slides.forEach(slide => slide.style.display = 'none');
            slides[slideIndex].style.display = 'flex'; /* Use flex to center the image */
        }

        function nextSlide() {
            showSlides(slideIndex += 1);
        }

        function prevSlide() {
            showSlides(slideIndex -= 1);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        showSlides(slideIndex);

        // Automatically change slides every 3 seconds
        setInterval(() => {
            nextSlide();
        }, 3000);
    });
}

// Insert images into highlights section
document.getElementById('highlight-img-1').src = 'images/prime-location.jpg';
document.getElementById('highlight-img-2').src = 'images/luxury-amenities.jpg';
document.getElementById('highlight-img-3').src = 'images/24-7-service.jpg';
document.getElementById('highlight-img-4').src = 'images/free-wifi.jpg';
document.getElementById('highlight-img-5').src = 'images/exclusive-offers.jpg';
document.getElementById('highlight-img-6').src = 'images/pet-friendly.jpg';
