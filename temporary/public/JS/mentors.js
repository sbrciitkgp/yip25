const hamburger = document.getElementById("hamburger");
      const side = document.getElementById("side");

      hamburger.addEventListener("click", () => {
        if (side.style.display === "none" || side.classList.contains("hidden")) {
          side.style.display = "flex";
          side.classList.remove("hidden");
          side.classList.add(
            "fixed",
            "top-0",
            "left-0",
            "z-40",
            "h-screen",
            "w-3/4",
            "bg-gray-800",
            "flex-col"
          );
        } else {
          side.style.display = "none";
          side.classList.add("hidden");
          side.classList.remove("fixed", "top-0", "left-0", "z-40", "w-3/4");
        }
      });
   