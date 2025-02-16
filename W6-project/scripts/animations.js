// Image animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate images on scroll
    const images = document.querySelectorAll('.animate-on-scroll');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        img.style.transition = 'all 0.6s ease-out';
        observer.observe(img);
    });

    loadFeaturedRooms();
    setupSlideshows();
});

function setupSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow-container');

    slideshows.forEach((slideshow, index) => {
        let slideIndex = 0;
        const slides = slideshow.querySelectorAll('.slide');
        const prevButton = document.createElement('a');
        const nextButton = document.createElement('a');

        prevButton.className = 'prev';
        prevButton.innerHTML = '&#10094;';
        nextButton.className = 'next';
        nextButton.innerHTML = '&#10095;';

        slideshow.appendChild(prevButton);
        slideshow.appendChild(nextButton);

        function showSlides(n) {
            if (n >= slides.length) { slideIndex = 0 }
            if (n < 0) { slideIndex = slides.length - 1 }
            slides.forEach(slide => slide.style.display = 'none');
            slides[slideIndex].style.display = 'block';
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
    });
}
