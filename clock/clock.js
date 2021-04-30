const secondHand = document.querySelector('.hand.second');
const minuteHand = document.querySelector('.hand.minute');
const hourHand = document.querySelector('.hand.hour');

setInterval(() => {
    const date = new Date();
    const seconds = date.getSeconds();
    const secondsDegrees = (seconds * 6) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    const minutes = date.getMinutes();
    const minutesDegrees = ((minutes + (seconds / 60)) * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    const hours = date.getHours();
    const hoursDegrees = ((hours + (minutes / 60) + (seconds / 3600)) * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    // console.clear();
    // console.log("Time is " + hours + ":" + minutes + ":" + seconds);
    // console.log(secondsDegrees);
    // console.log(minutesDegrees);
    // console.log(hoursDegrees); 

}, 1000);