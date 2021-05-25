const allCheckboxes = document.querySelectorAll("input");

let lastChecked;

function handleEvent(e) {
    if (e.shiftKey && lastChecked.checked) {
        const currentChecked = Number(this.name.replace(/\D/gm, ""));
        const lastOne = Number(lastChecked.name.replace(/\D/gm, ""));

        // console.log(lastOne);

        let loop = [lastOne, currentChecked];

        loop = loop.sort();
        // console.log(loop.sort());

        const secondLast = document.querySelector(`#item${loop[1] - 1}`);
        if (!secondLast.checked) {
            console.clear();
            for (let i = loop[0]; i <= loop[1]; i++) {
                const element = document.querySelector(`#item${i}`);

                element.checked = true;
                console.dir(element.labels[0].innerText);
            }
        } else {
            console.clear();
            for (let i = loop[0]; i <= loop[1]; i++) {
                const element = document.querySelector(`#item${i}`);

                element.checked = false;

                console.dir(element.labels[0].innerText);
            }
        }
    }

    lastChecked = this;
}

allCheckboxes.forEach((val) => {
    val.addEventListener("click", handleEvent);
});
