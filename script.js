document.addEventListener("DOMContentLoaded", function () {
    // Section switching logic
    function showSection(sectionId) {
        const sections = document.querySelectorAll("main > section");
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? "block" : "none";
        });

        const buttons = document.querySelectorAll("nav button");
        buttons.forEach(button => {
            if (button.dataset.section === sectionId) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }

    // Initial section to show
    showSection("home");

    // Set up button event listeners
    const navButtons = document.querySelectorAll("nav button");
    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.dataset.section;
            showSection(target);
        });
    });

    // Audio player logic
    const audio = document.getElementById("audio-player");
    const playButton = document.querySelector(".control-btn.play");
    const progressBar = document.querySelector(".progress-bar");
    const currentTimeDisplay = document.querySelector(".current-time");
    const durationTimeDisplay = document.querySelector(".duration-time");
    const prevButton = document.querySelector(".control-btn.prev");
    const nextButton = document.querySelector(".control-btn.next");

    if (audio) {
        progressBar.min = 0;

        audio.addEventListener("loadedmetadata", function () {
            const duration = audio.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            durationTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            progressBar.max = duration;
            progressBar.value = 0;
        });

        audio.addEventListener("timeupdate", function () {
            const currentTime = audio.currentTime;
            progressBar.value = currentTime;
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        });

        playButton.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                playButton.innerHTML = '<img src="assets/pause.png" alt="Pause" width="30">';
            } else {
                audio.pause();
                playButton.innerHTML = '<img src="assets/play.png" alt="Play" width="30">';
            }
        });

        progressBar.addEventListener("input", function (event) {
            audio.currentTime = event.target.value;
        });

        prevButton.addEventListener("click", function () {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        });

        nextButton.addEventListener("click", function () {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        });
    }
});
