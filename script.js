document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.video-carousel-track');
    const videos = Array.from(track.querySelectorAll('video'));
    const nextButton = document.querySelector('.nav-next');
    const prevButton = document.querySelector('.nav-prev');
    let currentIndex = 0;

    const playCurrentVideo = () => {
        videos.forEach(video => video.pause());
        videos[currentIndex].play();
    };

    const moveToNextVideo = () => {
        currentIndex = (currentIndex + 1) % videos.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        playCurrentVideo();
    };

    const moveToPrevVideo = () => {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        playCurrentVideo();
    };

    videos.forEach(video => {
        video.addEventListener('ended', moveToNextVideo);
    });

    if (nextButton) {
        nextButton.addEventListener('click', moveToNextVideo);
    }
    if (prevButton) {
        prevButton.addEventListener('click', moveToPrevVideo);
    }

    // Inicia el carrusel con el primer video
    playCurrentVideo();
});