document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();
    updateSummary();
    sendEmail();
});

const priceMap = {
    'Biryani Lamb': 9.50,
    'Biryani Chicken': 9.50,
    'Chicken Pilau': 8.50,
    'Sambusa': 1.20,
    'Spring Rolls': 1.20
};

function updateSummary() {
    const selectedItems = [];
    let totalPrice = 0;
    const summaryDetails = document.getElementById('summary-details');
    summaryDetails.innerHTML = '';

    document.querySelectorAll('.food-item').forEach(function (item) {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const quantityInput = item.querySelector('.quantity-input');
        
        if (checkbox.checked && quantityInput.value > 0) {
            const itemName = checkbox.value;
            const itemQuantity = parseInt(quantityInput.value);
            const itemPrice = priceMap[itemName] * itemQuantity;
            totalPrice += itemPrice;
            selectedItems.push(`${itemName} (x${itemQuantity}): €${itemPrice.toFixed(2)}`);
        }
    });

    selectedItems.forEach(function (item) {
        summaryDetails.innerHTML += `<p>${item}</p>`;
    });

    summaryDetails.innerHTML += `<p><strong>Total: €${totalPrice.toFixed(2)}</strong></p>`;
}

function sendEmail() {
    const emailData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        guests: document.getElementById('guest-count').value,
        venue: document.getElementById('venue').value,
        eventDate: document.getElementById('event-date').value,
        selectedItems: document.getElementById('summary-details').innerHTML,
    };

    // Placeholder for email sending logic.
    console.log("Sending email with the following data:", emailData);
}
