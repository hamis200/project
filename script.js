/* JavaScript - script.js */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  const quoteSummary = document.getElementById('quote-summary');
  const totalPriceEl = document.getElementById('total-price');
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const eventTypeSelect = document.getElementById('event-type');
  const otherEventType = document.getElementById('other-event-type');

  let totalPrice = 0;

  // Function to update the quote summary and total price
  function updateSummary() {
    let summaryHTML = '';
    totalPrice = 0;
    
    quantityInputs.forEach(input => {
      const quantity = parseInt(input.value, 10);
      const price = parseFloat(input.getAttribute('data-price'));
      if (quantity > 0) {
        const itemTotal = quantity * price;
        totalPrice += itemTotal;
        summaryHTML += `<p>${quantity} x ${input.closest('.food-card').querySelector('h3').innerText}: €${itemTotal.toFixed(2)}</p>`;
      }
    });

    quoteSummary.innerHTML = summaryHTML || '<p>No items selected.</p>';
    totalPriceEl.textContent = totalPrice.toFixed(2);
  }

  // Add event listeners to update the summary when quantity changes
  quantityInputs.forEach(input => {
    input.addEventListener('input', updateSummary);
  });

  // Show/hide the "other" event type input
  eventTypeSelect.addEventListener('change', function () {
    if (eventTypeSelect.value === 'other') {
      otherEventType.style.display = 'block';
    } else {
      otherEventType.style.display = 'none';
    }
  });

  // Form submission with Netlify
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const emailData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      venue: formData.get('venue'),
      date: formData.get('date'),
      time: formData.get('time'),
      eventType: formData.get('event-type') === 'other' ? formData.get('other-event') : formData.get('event-type'),
      guestCount: formData.get('guest-count'),
      foodAllergies: formData.get('food-allergies'),
      dietaryPreferences: formData.get('dietary-preferences'),
      summary: quoteSummary.innerHTML,
      total: totalPriceEl.textContent
    };

    sendEmail(emailData); // Call the email function

    // Optional: Trigger a success animation using Lottie
    // Example:
    /*
    const successAnimation = document.getElementById('success-animation');
    successAnimation.style.display = 'block';
    successAnimation.play();
    */

    alert("Your quote has been submitted. We will contact you shortly!");
    form.reset();
    updateSummary(); // Reset summary
  });

  // Function to send email (using Netlify or another service)
  function sendEmail(data) {
    const message = `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Time:</strong> ${data.time}</p>
      <p><strong>Event Type:</strong> ${data.eventType}</p>
      <p><strong>Guest Count:</strong> ${data.guestCount}</p>
      <p><strong>Food Allergies:</strong> ${data.foodAllergies}</p>
      <p><strong>Dietary Preferences:</strong> ${data.dietaryPreferences}</p>
      <h3>Order Summary:</h3>
      ${data.summary}
      <p><strong>Total:</strong> €${data.total}</p>
    `;

    // Send an email using Netlify Forms or another API
    console.log("Sending email with the following data:", message);
    // Implement an email service to actually send this
  }

  // Initialize summary on page load
  updateSummary();
});
