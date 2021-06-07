const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const browserConsole = document.querySelector('#console');

let latitude1;
let longitude1;

const degsToRads = deg => (deg * Math.PI) / 180.0;
const toDegrees = rad => rad * 180 / Math.PI;;


// function getDegrees(data) {

//     let latitude2 = (data.coords.latitude).toFixed(4);
//     let longitude2 = (data.coords.longitude).toFixed(4);

//     console.log(latitude1, latitude2, longitude1, longitude2);

//     let longDiff = degsToRads(longitude2 - longitude1);

//     let y = Math.sin(longDiff) * Math.cos(latitude2);
//     let x = Math.cos(latitude1) * Math.sin(latitude2) - Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(longDiff);

//     return (toDegrees(Math.atan2(y, x)).toFixed(1));
// }

navigator.geolocation.watchPosition((data) => {

    // cons.innerHTML = (data.coords.heading).toFixed(2) + " Degree";
    browserConsole.innerHTML = (data.coords.heading).toFixed(2) + " Degree";
    speed.textContent = ((data.coords.speed) * 3.6).toFixed(2);
    arrow.style.transform = `rotate( -${(data.coords.heading).toFixed(2)}deg)`;
    arrow.style.transition = `transform .4s`;

    latitude1 = (data.coords.latitude).toFixed(4);
    longitude1 = (data.coords.longitude).toFixed(4);
}, (err) => {
    console.error(err);
});