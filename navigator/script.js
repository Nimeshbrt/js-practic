const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const cons = document.querySelector('#console');


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    return 'Your current position is:';
}

function error(err) {
    return `ERROR(${err.code}): ${err.message}`;
}

// navigator.geolocation.getCurrentPosition(success, error, options);

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    const abbc = navigator.geolocation.getCurrentPosition(success, error, options);
    cons.innerHTML = ((data.coords.speed) * 3.6).toFixed(2) ;
    speed.textContent = ((data.coords.speed) * 3.6).toFixed(2);
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
    console.error(err);
});