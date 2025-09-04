function generateInputs() {
  let count = document.getElementById("count").value;
  const container = document.getElementById("participantsContainer");
  container.innerHTML = ""; 

    if (count > 4) count = 4;
    if (count < 1) count = 1;

    

  for (let i = 1; i <= count; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Enter Name of participant ${i} `;
    input.className = "text-white p-2 w-[200px] rounded bg-zinc-800";
    container.appendChild(input);
    const input2 = document.createElement("input");
    input2.type = "text";
    input2.placeholder = `Enter class of participant ${i} `;
    input2.className = "text-white p-2  w-[200px] rounded bg-zinc-800";
    container.appendChild(input2);
    const input3 = document.createElement("input");
    input3.type = "text";
    input3.placeholder = `Enter email id of participant ${i} `;
    input3.className = "text-white p-2 w-[200px] rounded bg-zinc-800";
    container.appendChild(input3);
  }
  

}

const adminhamburger = document.getElementById("adminhamburger");
      const side = document.getElementById("side");
      const close = document.getElementById("close");

      
      adminhamburger.addEventListener("click", () => {
        console.log("Hamburger was clicked")
        close.classList.toggle("hidden");
        adminhamburger.classList.toggle("hidden");
        side.classList.toggle("hidden");
        side.classList.toggle("z-40");
      });
       
      close.addEventListener("click", () => {
        adminhamburger.classList.toggle("hidden");
        close.classList.toggle("hidden");
        side.classList.toggle("hidden");
        side.classList.toggle("z-40");
      });

      
