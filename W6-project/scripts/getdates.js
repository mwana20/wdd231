document.addEventListener('DOMContentLoaded', (event) => {
    const currentYearElement = document.getElementById('currentYear');
    const lastModifiedElement = document.getElementById('lastModified');

    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }

    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        lastModifiedElement.textContent = lastModified;
    }
});