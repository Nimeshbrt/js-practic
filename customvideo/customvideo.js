console.log("loaded");

const container = document.querySelector("#video-container");
const video = document.querySelector("video");
const progress = document.querySelector("progress");
const progressonhover = document.querySelector("#progressonhover");
const playIcon = document.querySelector("#play-icon");
const sound = document.querySelector("#sound");
const skipVideoForward = document.querySelector(".skipf");
const skipVideoBackwards = document.querySelector(".skipb");

function togglePlay() {
    const state = video.paused ? "play" : "pause";

    video[state]();

    if (video.paused) {
        playIcon.classList.remove("d-none");
    } else {
        playIcon.classList.add("d-none");
    }

    // console.log(state);
}

function soundSlider() {
    if (video.volume <= 1 && video.volume >= 0) {
        video.muted = false;
        video.volume = sound.value / 100;
        // console.log(sound.value);
        // sound.value = (video.volume).toFixed(2) * 100;
    }
}

function openFullscreen() {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
        /* Safari */
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
        /* IE11 */
        container.msRequestFullscreen();
    }
}

function skip(e) {
    if (e.key == "ArrowLeft") {
        video.currentTime -= 10;
    }
    if (e.key == "ArrowRight") {
        video.currentTime += 10;
    }
    if (e.key == "ArrowUp") {
        if (video.volume <= 1 && video.volume >= 0) {
            video.muted = false;
            video.volume += 0.05;
            sound.value = video.volume.toFixed(2) * 100;
        }
    }
    if (e.key == "ArrowDown") {
        if (video.volume <= 1 && video.volume >= 0) {
            video.muted = false;
            video.volume -= 0.05;
            sound.value = video.volume.toFixed(2) * 100;
        }
    }
    if (e.code == "Space") {
        togglePlay();
    }
    if (e.key == "m") {
        video.muted = !video.muted;
    }
    if (e.key == "f") {
       openFullscreen();
    }
    if (e.key == "+") {
        video.playbackRate += 0.25;
    }
    if (e.key == "-") {
        video.playbackRate -= 0.25;
    }

    // (e.key == "ArrowLeft") ? console.log(e) : console.log(false);
    // (e.key == "ArrowRight") ? console.log(e) : console.log(false);
}

video.addEventListener("click", togglePlay);
playIcon.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", () => {
    progress.value = ((video.currentTime / video.duration) * 100).toFixed(2);
    // console.log("new time");
});

progress.addEventListener("drag", (e) => {
    progress.value = ((e.offsetX / e.target.offsetWidth) * 100).toFixed(2);
    video.currentTime = (progress.value / 100) * video.duration;
    togglePlay();
});

progress.addEventListener("dragend", (e) => {
    progress.value = ((e.offsetX / e.target.offsetWidth) * 100).toFixed(2);
    video.currentTime = (progress.value / 100) * video.duration;
    togglePlay();
});

progress.addEventListener("mouseover", (e) => {
    progressonhover.value = ((e.offsetX / e.target.offsetWidth) * 100).toFixed(
        2
    );
    progressonhover.style.display = "";
    progress.style.display = "none";
});

progressonhover.addEventListener("mousemove", (e) => {
    progressonhover.value = ((e.offsetX / e.target.offsetWidth) * 100).toFixed(
        2
    );
    progressonhover.style.display = "";
    progress.style.display = "none";
});

progressonhover.addEventListener("mouseleave", (e) => {
    progressonhover.value = ((e.offsetX / e.target.offsetWidth) * 100).toFixed(
        2
    );
    progress.style.display = "";
    progressonhover.style.display = "none";
});

progress.addEventListener("click", (e) => {
    progress.value = ((e.offsetX / e.target.offsetWidth) * 100).toFixed(2);
    video.currentTime = (progress.value / 100) * video.duration;
    togglePlay();
});

progressonhover.addEventListener("click", (e) => {
    progress.value = ((e.offsetX / e.target.offsetWidth) * 100).toFixed(2);
    video.currentTime = (progress.value / 100) * video.duration;
    // togglePlay();
});

document.addEventListener("keydown", skip);
sound.addEventListener("input", soundSlider);
window.addEventListener("load", () => (sound.value = 100));
skipVideoForward.addEventListener("click", () => video.currentTime += 30);
skipVideoBackwards.addEventListener("click", () => video.currentTime -= 30);
