const adminhamburger = document.getElementById("adminhamburger");
      const side = document.getElementById("side");
      const close = document.getElementById("close");

      
      adminhamburger.addEventListener("click", () => {
        console.log("Hamburger was clicked")
        close.classList.toggle("hidden");
        adminhamburger.classList.toggle("hidden");
        side.classList.toggle("hidden");
        side.classList.toggle("z-40");
        side.classList.toggle("h-screen");
      });
       
      close.addEventListener("click", () => {
        adminhamburger.classList.toggle("hidden");
        close.classList.toggle("hidden");
        side.classList.toggle("hidden");
        side.classList.toggle("z-40");
        side.classList.toggle("h-screen");
      });

      
