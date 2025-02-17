// This code goes in your scripts/contact.js file
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Create URL with query parameters
      const url = `thankyou.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
      
      // Redirect to thank you page with the data
      window.location.href = url;
  });
});

// This code goes in your scripts/thankyou.js file
document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const formDetails = document.getElementById('formDetails');
  
  // Map of parameter names to display labels
  const paramLabels = {
      'name': 'Name',
      'email': 'Email',
      'phone': 'Phone',
      'subject': 'Subject',
      'message': 'Message'
  };

  // Create HTML for each parameter
  for (const [param, label] of Object.entries(paramLabels)) {
      if (urlParams.has(param)) {
          const div = document.createElement('div');
          div.className = 'detail-item';
          div.innerHTML = `
              <span class="detail-label">${label}:</span>
              <span class="detail-value">${urlParams.get(param)}</span>
          `;
          formDetails.appendChild(div);
      }
  }  

  // Handle rating form submission
  const rateForm = document.getElementById('rateForm');
  rateForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const rating = document.getElementById('rating').value;
      alert(`Thank you for rating us ${rating} stars!`);
  });
});