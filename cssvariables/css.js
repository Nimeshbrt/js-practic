const input = document.querySelectorAll('input');
const img = document.querySelector('img');


function changeIt(e) {
    const unit = this.dataset.sizing;

    document.documentElement.style.setProperty(`--${this.name}`, this.value + unit);
    // console.log(this.name);

}

function changeimg() {
    this.src = "http://unsplash.it/" + Math.floor((Math.random() * 80) + 400) + "?random=" + new Date().getTime();
    // img.classList.toggle("d-none");

}

input.forEach(input => input.addEventListener('change', changeIt));
input.forEach(input => input.addEventListener('mousemove', changeIt));
input.forEach(input => input.addEventListener('click', changeIt));

img.addEventListener('click', changeimg);

/* {
    "student": {
        "name": "Harry",
        "country": "United State",
        "ContactNo": 2545454
    }
}

$postArray = array(
    "startDate" => $_POST['startDate'],
    "headline" => $_POST['headline'],
    "text" => $_POST['text'],
    "asset" => array(
        "media" => $_POST["media"],
        "caption" => $_POST['caption']
    )
); */