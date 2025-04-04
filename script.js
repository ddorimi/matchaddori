// Function to navigate to a new page 
function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () { 
    const audio = document.getElementById("audio-player");
    const playButton = document.querySelector(".control-btn.play");
    const progressBar = document.querySelector(".progress-bar");
    const currentTimeDisplay = document.querySelector(".current-time");
    const durationTimeDisplay = document.querySelector(".duration-time");
    const prevButton = document.querySelector(".control-btn.prev");
    const nextButton = document.querySelector(".control-btn.next");

    // Set duration and progress bar max value when audio is ready
    audio.addEventListener("loadedmetadata", function () {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        durationTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        progressBar.max = duration;
    });

    // Update current time and progress bar
    audio.addEventListener("timeupdate", function () {
        const currentTime = audio.currentTime;
        progressBar.value = currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });

    // Toggle play/pause
    playButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = '<img src="assets/pause.png" alt="Pause" width="30">';
        } else {
            audio.pause();
            playButton.innerHTML = '<img src="assets/play.png" alt="Play" width="30">';
        }
    });

    // Seek audio via progress bar
    progressBar.addEventListener("input", function (event) {
        audio.currentTime = event.target.value;
    });

    // Skip backward
    prevButton.addEventListener("click", function () {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    // Skip forward
    nextButton.addEventListener("click", function () {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });
});
