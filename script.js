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

  /* === GSAP Animations === */

  // Animate Header Elements on Load
  gsap.from(".header-container img, .header-container h1, .header-container lottie-player", {
    duration: 1.5,
    opacity: 0,
    y: -50,
    ease: "power2.out",
    stagger: 0.3
  });

  /* === Three.js 3D Animation === */

  // Basic Three.js setup: rotating cube
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, document.getElementById('threejs-container').clientWidth / document.getElementById('threejs-container').clientHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(document.getElementById('threejs-container').clientWidth, document.getElementById('threejs-container').clientHeight);
  document.getElementById('threejs-container').appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00C853, wireframe: false });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);
  scene.add(camera);

  camera.position.z = 5;

  function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animateThreeJS();

  // Handle window resize for Three.js
  window.addEventListener('resize', () => {
    const container = document.getElementById('threejs-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  /* === ScrollMagic Animations === */

  // Initialize ScrollMagic Controller
  const controller = new ScrollMagic.Controller();

  // Animate Order Form on Scroll
  new ScrollMagic.Scene({
    triggerElement: ".order-form",
    triggerHook: 0.8,
    reverse: false
  })
  .setTween(gsap.from(".order-form", { duration: 1, y: 100, opacity: 0, ease: "power2.out" }))
  .addTo(controller);

  /* === Anime.js Animation === */

  // Simple Anime.js animation for the SVG circle
  anime({
    targets: '.anime-animation svg circle',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2000,
    delay: 500,
    direction: 'alternate',
    loop: true
  });

  /* === Lottie Animation Controls === */

  // Optional: Control Lottie animations via JavaScript if needed
  // Example: Pause the Lottie animation when the form is submitted
  const lottieAnimations = document.querySelectorAll('lottie-player');
  form.addEventListener('submit', function () {
    lottieAnimations.forEach(anim => anim.pause());
  });
});
