document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.video-carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.nav-next');
    const prevButton = document.querySelector('.nav-prev');
    const videos = track.querySelectorAll('video');

    let slideWidth;
    let currentSlide = 0;

    const setSlideWidth = () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    };

    window.addEventListener('resize', setSlideWidth);
    setSlideWidth();

    const updateCarousel = (targetIndex) => {
        track.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
        videos.forEach((video, index) => {
            if (index === targetIndex) {
                video.play().catch(error => {
                    console.error("Autoplay failed:", error);
                    video.controls = true;
                });
            } else {
                video.pause();
                // Eliminamos la línea para no reiniciar el video
            }
        });
    };

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel(currentSlide);
    });

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel(currentSlide);
    });
    
    // Función para manejar el evento de pantalla completa
    videos.forEach(video => {
        video.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                // Si salimos de pantalla completa, pausa el video
                video.pause();
                // Actualiza el carrusel para que permanezca en el video actual
                updateCarousel(currentSlide);
            }
        });
    });

    // Inicia el carrusel con el primer video reproduciéndose
    updateCarousel(currentSlide);
});