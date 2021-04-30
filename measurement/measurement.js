const len = document.getElementById("length");
const bre = document.getElementById("breadth");

const len1 = document.querySelector(".length");
const bre1 = document.querySelector(".breadth");



// Actual Length
const actualLength = document.querySelector('.actual-length');
const actualBreadth = document.querySelector('.actual-breadth');

len.addEventListener('input', () => {

    if (len.value <= 999 && len.value !== "" & len.value > 0) {
        actualLength.innerHTML = `${len.value}CM`;
        len1.style.setProperty('opacity', 1);
        len1.style.setProperty('height', "100%");
    } else {
        actualLength.innerHTML = `${len.value}CM`;
        len1.style.setProperty('opacity', 0);
        len1.style.setProperty('height', "0%");
    }
});

bre.addEventListener('input', () => {
    if (bre.value <= 999 && bre.value !== "" & bre.value > 0) {
        actualBreadth.innerHTML = `${bre.value}CM`;
        bre1.style.setProperty('opacity', 1);
        bre1.style.setProperty('width', "100%");
    } else {
        actualBreadth.innerHTML = `${bre.value}CM`;
        bre1.style.setProperty('opacity', 0);
        bre1.style.setProperty('width', "0%");
    }
});