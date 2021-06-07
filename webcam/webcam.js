const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

async function getVideoasync() {
    const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });

    video.srcObject = media;

    video.play();
}



async function paintToCanvas() {
    await getVideoasync();
    await video.play();
    const width = video.videoWidth;
    const height = video.videoHeight;

    
    canvas.width = width;
    canvas.height = height;
    
    


    console.log(width, height);
    takePhoto();

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        
        pixels = redEffect(pixels);

        ctx.putImageData(pixels, 0, 0);

    }, 16);

    
}

paintToCanvas();


function redEffect(abc) {
    for (let index = 0; index < abc.data.length; index+=4) {
        abc.data[index + 0] = abc.data[index + 0] + 200; //red
        abc.data[index + 1] = abc.data[index + 1] - 60;  //green
        abc.data[index + 2] = abc.data[index + 2] ; //blue
    }

    return abc;
}


function takePhoto() {
    snap.currentTime = 0;
    // const a = document.createElement("a");
    // a.setAttribute("download", "handsome");
    // // a.setAttribute("target", "_blank");
    // a.href = "#";

    // strip.insertBefore(a, strip.firstChild);


        const data = canvas.toDataURL('image/jpeg');
        // a.href = data;
        strip.innerHTML += `<img src="${data}" download>`;
        // snap.play();
}