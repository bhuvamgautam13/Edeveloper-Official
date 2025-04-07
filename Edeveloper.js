// Smooth Scroll to Top
document.querySelectorAll('.btn-info').forEach(button => {
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Form Validation for Sign-up Modal
document.querySelector('#signupModal .btn-primary').addEventListener('click', () => {
  const username = document.querySelector('#signupModal textarea').value.trim();
  const email = document.querySelector('#signupModal input[type="email"]').value.trim();
  const password = document.querySelector('#signupModal input[type="password"]').value.trim();
  const mobile = document.querySelector('#signupModal textarea:last-of-type').value.trim();
  const checkbox = document.querySelector('#signupModal input[type="checkbox"]').checked;

  if (!username || !email || !password || !mobile || !checkbox) {
    alert('Please fill out all fields and confirm the information is correct.');
  } else {
    alert('Sign-up successful! Welcome to EDEVELOPER.');
    document.querySelector('#signupModal').classList.remove('show');
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop').remove();
  }
});

// FAQ Accordion Toggle
document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
  });
});

// Carousel Auto-Play Pause on Hover
const carousel = document.querySelector('#carouselExampleDark');
if (carousel) {
  carousel.addEventListener('mouseover', () => {
    bootstrap.Carousel.getInstance(carousel).pause();
  });
  carousel.addEventListener('mouseout', () => {
    bootstrap.Carousel.getInstance(carousel).cycle();
  });
}

// Highlight Active Navigation Link
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});