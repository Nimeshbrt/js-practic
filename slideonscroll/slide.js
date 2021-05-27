console.log("loaded");

const body = document.querySelector('body');
const section = document.querySelectorAll('section');


window.addEventListener("scroll", () => {
   section.forEach((val) => {

        if (window.scrollY >= (val.offsetTop - (0.2 * val.offsetHeight)) ) {
            val.children[1].classList.add("animate");
            // console.dir(val);
        }else{
            val.children[1].classList.remove("animate");
        }

   })
}) 
window.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

