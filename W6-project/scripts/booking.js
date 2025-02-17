// thanks.js
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Get the form details container
        const formDetails = document.getElementById('formDetails');
        
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check if we have the form details container
        if (!formDetails) {
            console.error('Form details container not found');
            return;
        }
        
        // Define the fields we want to display and their labels
        const paramLabels = {
            'name': 'Name',
            'email': 'Email',
            'phone': 'Phone',
            'subject': 'Subject',
            'message': 'Message'
        };
        
        // Loop through each parameter and create the display elements
        Object.entries(paramLabels).forEach(([param, label]) => {
            if (urlParams.has(param)) {
                const value = urlParams.get(param);
                
                // Create a new div for each detail
                const detailDiv = document.createElement('div');
                detailDiv.className = 'detail-item';
                
                // Add the label and value
                detailDiv.innerHTML = `
                    <span class="detail-label">${label}:</span> 
                    <span class="detail-value">${value}</span>
                `;
                
                // Add to the form details container
                formDetails.appendChild(detailDiv);
            }
        });
        
        // If no parameters were found, display a message
        if (formDetails.children.length === 0) {
            formDetails.innerHTML = '<p>No form details available.</p>';
        }
    } catch (error) {
        console.error('Error displaying form details:', error);
    }
});