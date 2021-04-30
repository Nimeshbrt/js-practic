console.clear("loaded");
console.log("loaded");

// 

window.addEventListener('keydown', play);

function play(e) {
    // console.log(e.code);
    try {

        const selectKey = document.querySelector(`div[data-key = "${e.key}"]`);
        // console.log(selectKey);
        const selectAudio = document.querySelector(`audio[data-key = "${e.key}"]`);
        selectKey.classList.toggle("playing");
        selectAudio.currentTime = 0;
        selectAudio.play();
        selectKey.addEventListener('transitionend', function(el) {
            // console.log(el.target);
            el.target.classList.remove("playing");
        });

    } catch (err) {
        console.log(err.message);
    }


}

const keys = document.querySelectorAll('div[data-key]');
keys.forEach(val => val.addEventListener('transitionend', (v) => {
    // console.log(v.target);
    v.target.classList.remove('playing');
}));