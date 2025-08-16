
        let slideIndex = 0;
        let slides = Array.from(document.getElementsByClassName("slide"));
        let prev=document.querySelector(".prev");
        let next=document.querySelector(".next");
        let dots = Array.from(document.getElementsByClassName("dot"));
        function showslide(index) {
          slides.forEach((slide, i) => {
            slide.classList.toggle("hidden", i !== index);
          });
          dots.forEach((dot, i) => {
            dot.classList.toggle("bg-gray-700", i !== index);
            dot.classList.toggle("bg-gray-400", i === index);
          });
          slideIndex = index;
        }
        dots.forEach((dot, i) => {
          dot.addEventListener("click", () => {
            showslide(i);
          });
        });

        prev.addEventListener("click", () => {
            showslide((slideIndex - 1 +slides.length) % slides.length);
          })
        next.addEventListener("click", () => {
            showslide((slideIndex + 1) % slides.length);
          })


        setInterval(() => {
          let newIndex = (slideIndex + 1) % slides.length;
          showslide(newIndex);
        }, 3000);
        showslide(slideIndex);
  