document.addEventListener('DOMContentLoaded', function() {
  // Navigation Menu Toggle
  let navToggle = document.querySelector('.nav-toggle');
  let navMenu = document.querySelector('.nav-menu');
  let arrow = document.querySelector('.arrow');
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('nav-menu-active');
    if (navMenu.classList.contains('nav-menu-active')) {
      arrow.innerHTML = '&#x25B2;'; // Upward arrow
    } else {
      arrow.innerHTML = '&#x25BC;'; // Downward arrow
    }
  });

  // Keyboard Accessibility for Navigation Links
  let navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(function(link) {
    link.addEventListener('focus', function() {
      link.style.outline = '2px solid #ff0';
    });
    link.addEventListener('blur', function() {
      link.style.outline = 'none';
    });
  });

  // Keyboard Accessibility for Videos
  let videos = document.querySelectorAll('video');
  videos.forEach(function(video) {
    video.setAttribute('tabindex', '0');
  });

  // Reservation Form Handling
  let reservationForm = document.getElementById('reservation-form');
  let reservationMessage = document.getElementById('reservation-message');
  reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let guests = document.getElementById('guests').value;
    reservationMessage.textContent = `Gracias, ${name}. Tu reserva para ${guests} personas el ${date} a las ${time} 
    ha sido confirmada. Se ha enviado un correo de confirmación a ${email}.`;
    reservationMessage.classList.remove('hidden');
    reservationForm.reset();
  });
});
