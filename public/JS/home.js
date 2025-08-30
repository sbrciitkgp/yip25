feather.replace();

    // Testimonial slider
    const track = document.getElementById("sliderTrack");
    const testimonialSlides = track.querySelectorAll("div");
    let testimonialIndex = 0;
    function goToSlide(i){ track.style.transform = `translateX(-${i * 100}%)`; }
    function nextTestimonial(){ testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length; goToSlide(testimonialIndex);}
    setInterval(nextTestimonial, 4000);

    // Gallery slider
    const gallery = document.getElementById("slider");
    const gallerySlides = gallery.querySelectorAll(".gallery-slide");
    let current = 0, timer;
    const showSlide = (i)=>{ gallerySlides.forEach(s=>s.classList.remove("opacity-100","z-10")); gallerySlides[i].classList.add("opacity-100","z-10"); };
    const changeSlide = (dir)=>{ current = (current+dir+gallerySlides.length)%gallerySlides.length; showSlide(current); };
    const autoSlide = ()=>{ timer=setInterval(()=>changeSlide(1),2000); };
    gallery.addEventListener("mouseenter",()=>clearInterval(timer));
    gallery.addEventListener("mouseleave",autoSlide);
    autoSlide();