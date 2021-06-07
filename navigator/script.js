const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const cons = document.querySelector('#console');

// navigator.geolocation.getCurrentPosition(success, error, options);

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    cons.innerHTML = data.coords.heading + "Degree";
    speed.textContent = ((data.coords.speed) * 3.6).toFixed(2);
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
    console.error(err);
});