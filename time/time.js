console.log((new Date()).getTime());

const date = new Date();
const time = date.getHours();

const timeDiv = document.querySelector('#time');
const gmtDiv = document.querySelector('#gmt');

function GMT() {
    const cgmt = Math.abs(date.getTimezoneOffset());

    cgmtHour = Math.floor(cgmt / 60); //get lowest integer example 6 if 6.04.  Math.ceil() does opposite
    cgmtminute = cgmt % 60; //get remainder
    if (date.getTimezoneOffset() < 1) {
        return "UTC + " + cgmtHour + " : " + cgmtminute;
    } else {
        return "UTC - " + cgmtHour + " : " + cgmtminute;
    }
}

gmtDiv.innerHTML = GMT();

setInterval(() => {
    const date = new Date();
    let hour = date.getHours();
    let pm;

    if (hour > 11) {
        pm = "PM";
    } else {
        pm = "AM";
    }

    let minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }

    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hour > 12) {
        hour = Math.round(hour - 12);
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    timeDiv.innerHTML = hour + " : " + minute + " : " + seconds + " " + pm;

}, 1000);