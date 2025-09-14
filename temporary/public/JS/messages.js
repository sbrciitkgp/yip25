let slideIndex = 0;
let slides = Array.from(document.getElementsByClassName("slide"));
let dots = Array.from(document.getElementsByClassName("dot"));
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.add("hidden");
    slide.classList.remove("animate-slide-up");
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-gray-700", i === index);
    dot.classList.toggle("bg-gray-400", i !== index);
  });

  slides[index].classList.remove("hidden");
  slides[index].classList.add("animate-slide-up");
  slideIndex = index;
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

prev.addEventListener("click", () => {
  showSlide((slideIndex - 1 + slides.length) % slides.length);
});

next.addEventListener("click", () => {
  showSlide((slideIndex + 1) % slides.length);
});

setInterval(() => {
  let newIndex = (slideIndex + 1) % slides.length;
  showSlide(newIndex);
}, 5000);

showSlide(slideIndex);
