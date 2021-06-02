const header = document.querySelector('#header');

let lastpos = header.clientHeight * 3;
let minScrollPos = header.clientHeight * 3;

function fscroll(e) {
    if (header.offsetTop >= minScrollPos && header.offsetTop >= lastpos) {
        header.classList.add('sticky');
        lastpos = header.offsetTop;
    }
    if (header.offsetTop < lastpos) {
        header.classList.remove('sticky');
        lastpos = header.offsetTop;
    }
}

document.addEventListener("scroll", fscroll);