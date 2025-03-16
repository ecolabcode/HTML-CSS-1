document.addEventListener('DOMContentLoaded', function() {
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('nav-menu-active');
  });

  var navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(function(link) {
    link.addEventListener('focus', function() {
      link.style.outline = '2px solid #ff0';  // Resaltar el foco del teclado
    });
    link.addEventListener('blur', function() {
      link.style.outline = 'none';
    });
  });

  var videos = document.querySelectorAll('video');
  videos.forEach(function(video) {
    video.setAttribute('tabindex', '0');  // Hacer que los videos sean accesibles por teclado
  });
});

