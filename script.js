function calculateTotal(event) {
  event.preventDefault();

  // Get the form values
  const biryaniQuantity = parseInt(document.querySelector('[name="biryaniQuantity"]').value) || 0;
  const pilauQuantity = parseInt(document.querySelector('[name="pilauQuantity"]').value) || 0;
  const sambusaQuantity = parseInt(document.querySelector('[name="sambusaQuantity"]').value) || 0;
  const springRollsQuantity = parseInt(document.querySelector('[name="springRollsQuantity"]').value) || 0;

  // Prices
  const biryaniPrice = 9.50;
  const pilauPrice = 8.50;
  const sambusaPrice = 1.20;
  const springRollsPrice = 1.20;

  // Calculate the total
  const total = (biryaniQuantity * biryaniPrice) +
                (pilauQuantity * pilauPrice) +
                (sambusaQuantity * sambusaPrice) +
                (springRollsQuantity * springRollsPrice);

  // Display the total price
  document.getElementById('totalPrice').innerHTML = `Total Price: €${total.toFixed(2)}`;
}
// Placeholder for any JavaScript functionality

// You can add functionality for submitting the form using JavaScript if needed
document.querySelector('.order-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Example alert - replace with your form submission logic
  alert('Form Submitted! We will process your order.');
});
