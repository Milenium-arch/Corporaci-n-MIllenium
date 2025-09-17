document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.video-carousel-track');
    const slides = Array.from(track.children);
    const videos = slides.map(slide => slide.querySelector('video'));
    const nextButton = document.querySelector('.nav-next');
    const prevButton = document.querySelector('.nav-prev');
    let currentIndex = 0;

    const playCurrentVideo = () => {
        // Pausa todos los videos
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0; // Reinicia el video para la próxima vez
        });

        // Reproduce el video actual
        videos[currentIndex].play();
    };

    const moveToSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        playCurrentVideo();
    };

    // Botón Siguiente
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    // Botón Anterior
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    // Evento para que el video avance automáticamente al siguiente
    videos.forEach((video) => {
        video.addEventListener('ended', () => {
            moveToSlide(currentIndex + 1);
        });
    });

    // Inicia el carrusel reproduciendo el primer video al cargar la página
    moveToSlide(0);
});