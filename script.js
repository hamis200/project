document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  const quoteSummary = document.getElementById('quote-summary');
  const totalPriceEl = document.getElementById('total-price');
  const notificationMessage = document.getElementById('notificationMessage');
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const eventTypeSelect = document.getElementById('event-type');
  const otherEventTypeContainer = document.getElementById('other-event-type-container');

  let totalPrice = 0;

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

  quantityInputs.forEach(input => {
    input.addEventListener('input', updateSummary);
  });

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

    fetch('/.netlify/functions/send-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
      .then(response => response.json())
      .then(data => {
        notificationMessage.style.display = 'block';
        setTimeout(() => notificationMessage.style.display = 'none', 5000);
        form.reset();
        updateSummary();
      })
      .catch(error => {
        console.error('Error:', error);
        alert("There was an error submitting your quote.");
      });
  });

  eventTypeSelect.addEventListener('change', function () {
    if (eventTypeSelect.value === 'other') {
      otherEventTypeContainer.style.display = 'block';
    } else {
      otherEventTypeContainer.style.display = 'none';
    }
  });
});
