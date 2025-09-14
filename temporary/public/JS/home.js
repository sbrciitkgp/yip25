const track = document.getElementById("sliderTrack");
const testimonialSlides = track.querySelectorAll("div");
let testimonialIndex = 0;

function goToSlide(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
}

function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  goToSlide(testimonialIndex);
}

// Auto play testimonials
setInterval(nextTestimonial, 4000);


// ===============================
// Gallery Slider
// ===============================
const slides = document.querySelectorAll("#slider .slide");
let current = 0;
let timer;
const e = document.querySelector('.nav'); 
const scrollThreshold = 400; // distance in px

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    // when scrolled past threshold
    e.classList.remove('bg-transparent');
    e.classList.add('bg-gray-800');
  } else {
    // when above threshold
    e.classList.remove('bg-gray-800');
    e.classList.add('bg-transparent');
  }
});


function showSlide(i) {
  slides.forEach((s, idx) => {
    s.classList.remove("opacity-100", "z-10");
    s.classList.add("opacity-0", "z-0");
    if (idx === i) {
      s.classList.add("opacity-100", "z-10");
      s.classList.remove("opacity-0", "z-0");
    }
  });
}

function changeSlide(dir) {
  current = (current + dir + slides.length) % slides.length;
  showSlide(current);
}

function autoSlide() {
  timer = setInterval(() => changeSlide(1), 3000);
}

// Pause on hover
const slider = document.getElementById("slider");
slider.addEventListener("mouseenter", () => clearInterval(timer));
slider.addEventListener("mouseleave", autoSlide);

// Start
showSlide(current);
autoSlide();
