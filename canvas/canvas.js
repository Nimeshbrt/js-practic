const canvas = document.querySelector("#draw");
const body = document.querySelector("body");

console.log(canvas);

const context = canvas.getContext("2d");

window.addEventListener("resize", () => {
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;
    console.log(window.innerHeight);
});

window.addEventListener("load", () => {
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;
    console.log(window.innerHeight);
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

let direction = true;

function draw(e) {
    if (!isDrawing) return;

    // if (context.lineWidth >= 50 || context.lineWidth <= 1) {
    //     direction = !direction;
    // }

    // if (direction) {
    //     context.lineWidth++;
    // } else {
    //     context.lineWidth--;
    // }

    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.className = "round";
    context.lineWidth = 20;

    context.beginPath();
    // Start From
    context.moveTo(lastX, lastY);

    // Start To
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;

    hue > 360 ? (hue = 0) : hue;
    // console.log(lineWidth);
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    console.log(isDrawing);
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

setInterval(() => {
    canvas.width = canvas.width;
}, 100000);
