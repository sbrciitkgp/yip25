const hamburger = document.getElementById("hamburger");
      const side = document.getElementById("side");

      
      hamburger.addEventListener("click", () => {
        side.classList.toggle("hidden");
        side.classList.toggle("fixed");
        side.classList.toggle("z-40");
        side.classList.toggle("h-screen");
        side.classList.toggle("top-15");
        side.classList.toggle("left-0");
      });

      
