document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  const quoteSummary = document.getElementById('quote-summary');
  const totalPriceEl = document.getElementById('total-price');
  const quantityInputs = document.querySelectorAll('.quantity-input');
  
  let totalPrice = 0;

  // Function to update the quote summary and total price
  function updateSummary() {
    let summaryHTML = '';
    totalPrice = 0;
    
    quantityInputs.forEach(input => {
      const quantity = parseInt(input.value) || 0; // Get the input quantity, default to 0 if invalid
      const price = parseFloat(input.getAttribute('data-price')); // Get the price for the item
      if (quantity > 0) {
        const itemTotal = quantity * price;
        totalPrice += itemTotal;
        summaryHTML += `<p>${quantity} x ${input.previousElementSibling.previousElementSibling.innerHTML}: €${itemTotal.toFixed(2)}</p>`;
      }
    });

    // Update the summary and total price display
    quoteSummary.innerHTML = summaryHTML || '<p>No items selected.</p>';
    totalPriceEl.textContent = totalPrice.toFixed(2); // Display total with two decimal places
  }

  // Add event listeners to update the summary and total when quantity changes
  quantityInputs.forEach(input => {
    input.addEventListener('input', updateSummary); // Recalculate on input change
  });

  // Form submission with Netlify handling (customize email function separately)
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const emailData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      venue: formData.get('venue'),
      date: formData.get('date'),
      summary: quoteSummary.innerHTML,
      total: totalPriceEl.textContent
    };

    sendEmail(emailData); // Call the email function (replace with actual implementation)

    alert("Your quote has been submitted. We will contact you shortly!");
    form.reset();
    updateSummary(); // Reset the form and summary after submission
  });

  // Function to send an email (placeholder for actual email functionality)
  function sendEmail(data) {
    const message = `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <p><strong>Date:</strong> ${data.date}</p>
      <h3>Order Summary:</h3>
      ${data.summary}
      <p><strong>Total:</strong> €${data.total}</p>
    `;

    // Placeholder for email functionality (replace this with actual email sending service)
    window.location.href = `mailto:hamis9474@gmail.com?subject=New Order&body=${encodeURIComponent(message)}`;
  }
});
