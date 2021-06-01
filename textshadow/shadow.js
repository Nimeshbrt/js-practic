const h1 = document.querySelector('h1');
const container = document.querySelector('#container');

console.log(h1);
   const walk = Number(prompt("Please Enter Maximum Value of Shadow", 50));

function shadow(e) {
    const {
        offsetWidth: width,
        offsetHeight: height
    } = container;
    let {
        offsetX: x,
        offsetY: y
    } = e;
    if (e.target !== this) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    xwalk = Math.round((x / width * walk) - (walk/2));
    ywalk = Math.round((y / height * walk) - (walk/2));
    
    h1.style.textShadow = `${xwalk}px ${ywalk}px 0 red`;
    console.log(xwalk, ywalk);
}

document.addEventListener("mousemove", shadow);