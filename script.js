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
            const quantity = input.value;
            const price = parseFloat(input.getAttribute('data-price'));
            if (quantity > 0) {
                const itemTotal = quantity * price;
                totalPrice += itemTotal;
                summaryHTML += `<p>${quantity} x ${input.previousElementSibling.previousElementSibling.innerHTML}: €${itemTotal.toFixed(2)}</p>`;
            }
        });

        quoteSummary.innerHTML = summaryHTML || '<p>No items selected.</p>';
        totalPriceEl.textContent = totalPrice.toFixed(2);
    }

    // Add event listeners to update the summary when quantity changes
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateSummary);
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
            eventType: formData.get('eventType'),
            guestCount: formData.get('guestCount'),
            allergies: formData.get('allergies'),
            dietPreferences: formData.get('dietPreferences'),
            summary: quoteSummary.innerHTML,
            total: totalPriceEl.textContent
        };

        sendEmail(emailData); // Call the email function

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
        <p><strong>Food Allergies:</strong> ${data.allergies}</p>
        <p><strong>Dietary Preferences:</strong> ${data.dietPreferences}</p>
        <h3>Order Summary:</h3>
        ${data.summary}
        <p><strong>Total:</strong> €${data.total}</p>
      `;

        console.log("Sending email with the following data:", message);
    }
});
