const container = document.querySelector("#video-container");
const controls = document.querySelector("#controls");
const video = document.querySelector("video");
const progress = document.querySelector("progress");
const progressonhover = document.querySelector("#progressonhover");
const playIcon = document.querySelector("#play-icon");
const soundslider = document.querySelector("#sound-slider");
const soundIcon = document.querySelector(".sound");
const muteIcon = document.querySelector(".mute");
const skipVideoForward = document.querySelector(".skipf");
const skipVideoBackwards = document.querySelector(".skipb");

function togglePlay() {
    const state = video.paused ? "play" : "pause";

    video[state]();

    if (video.paused) {
        playIcon.classList.remove("d-none");
        controls.classList.add("opacity");
    } else {
        playIcon.classList.add("d-none");
        controls.classList.remove("opacity");
    }
}

function soundF() {
    if (video.volume <= 1 && video.volume >= 0) {
        video.muted = false;
        video.volume = soundslider.value / 100;
        if (video.volume == 0) {
            soundIcon.style.display = "none";
            muteIcon.style.display = "block";
        } else {
            soundIcon.style.display = "block";
            muteIcon.style.display = "none";
        }
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
            if (video.volume == 1) {
                soundslider.value = 100;
                return;
            }
            const volumenew = (video.volume + 0.05).toFixed(2);
            video.volume = volumenew;
            soundslider.value = video.volume.toFixed(2) * 100;
            soundIcon.style.display = "block";
            muteIcon.style.display = "none";
        }
    }
    if (e.key == "ArrowDown") {
        if (video.volume <= 1 && video.volume >= 0) {
            video.muted = false;
            if (video.volume == 0) {
                soundslider.value = 0;
                soundIcon.style.display = "none";
                muteIcon.style.display = "block";
                return;
            }
            const volumenew = (video.volume - 0.05).toFixed(2);
            video.volume = volumenew;
            soundslider.value = video.volume.toFixed(2) * 100;
        }
    }
    if (e.code == "Space") {
        togglePlay();
    }
    if (e.key == "m") {
        video.muted = !video.muted;
        if (video.muted) {
            soundslider.value = 0;
            soundIcon.style.display = "none";
            muteIcon.style.display = "block";
        } else {
            soundslider.value = video.volume.toFixed(2) * 100;
            soundIcon.style.display = "block";
            muteIcon.style.display = "none";
        }
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
}

video.addEventListener("timeupdate", () => {
    progress.value = ((video.currentTime / video.duration) * 100).toFixed(2);
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
});

video.addEventListener("click", togglePlay);
playIcon.addEventListener("click", togglePlay);

document.addEventListener("keydown", skip);
soundslider.addEventListener("input", soundF);

skipVideoForward.addEventListener("click", () => (video.currentTime += 30));
skipVideoBackwards.addEventListener("click", () => (video.currentTime -= 30));

window.addEventListener("load", () => {
    if (video.paused) {
        controls.classList.add("opacity");
    } else {
        controls.classList.remove("opacity");
    }
    if (video.muted) {
        soundslider.value = 0;
        muteIcon.style.display = "block";
        soundIcon.style.display = "none";
    } else {
        soundslider.value = 100;
        muteIcon.style.display = "none";
        soundIcon.style.display = "block";
    }
});
