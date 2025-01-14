document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last Modified: ' + document.lastModified;


// JavaScript function to filter courses
function filterCourses(category) {
    // Get the container where courses will be displayed
    const container = document.querySelector('.certificate-list');

    // Define the course categories with their corresponding HTML
    const courses = {
        CSE: `
            <button>CSE 110</button>
            <button>CSE 210</button>
            <button>CSE 111</button>
        `,
        WDD: `
            <div class="come"><button>WDD 231</button></div>
            <button>WDD 131</button>
            <div class="come"><button>WDD 231</button></div>
        `,
        All: `
            <button>CSE 110</button>
            <button>CSE 210</button>
            <button>CSE 111</button>
            <div class="come"><button>WDD 231</button></div>
            <button>WDD 131</button>
            <div class="come"><button>WDD 231</button></div>
        `
    };

    // Update the container's inner HTML based on the selected category
    container.innerHTML = courses[category] || courses.All;
}

// Initialize by displaying all courses on page load
window.onload = () => {
    filterCourses('All');
};
