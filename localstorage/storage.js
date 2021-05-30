let allCheckboxes = document.querySelectorAll("input[id^=item]");
const inputForm = document.querySelector("#input-box");

let lastChecked;

function handleEvent(e) {
    if (e.shiftKey && lastChecked.checked) {
        const currentChecked = Number(this.name.replace(/\D/gm, ""));
        const lastOne = Number(lastChecked.name.replace(/\D/gm, ""));

        let loop = [lastOne, currentChecked];

        loop = loop.sort();

        const secondLast = document.querySelector(`#item${loop[1] - 1}`);
        if (!secondLast.checked) {
            console.clear();
            for (let i = loop[0]; i <= loop[1]; i++) {
                const element = document.querySelector(`#item${i}`);

                element.checked = true;

                const ee = new Event("change");
                element.dispatchEvent(ee);

            }
        } else {
            console.clear();
            for (let i = loop[0]; i <= loop[1]; i++) {
                const element = document.querySelector(`#item${i}`);

                element.checked = false;

                const ee = new Event("change");
                element.dispatchEvent(ee);

            }
        }
    }

    lastChecked = this;
}

function handleChecked(e) {
    if (e.target.checked) {
        const storedData = JSON.parse(localStorage.getItem("items"));
        const id = Number((e.target.id).replace(/\D/gm, "") - 1);

        storedData[id].checked = true;

        localStorage.setItem("items", JSON.stringify(storedData));
    } else {
        const storedData = JSON.parse(localStorage.getItem("items"));
        const id = Number((e.target.id).replace(/\D/gm, "") - 1);

        storedData[id].checked = false;

        localStorage.setItem("items", JSON.stringify(storedData));
    }
}


const items = document.querySelector('#items');


let itemDataArray = [];

if (JSON.parse(localStorage.getItem("items"))) {
    itemDataArray = JSON.parse(localStorage.getItem("items"));
    // console.log(itemDataArray);
}


function submitForm(e) {

    e.preventDefault();
    const value = this.children.addnew.value;
    if (!value) {
        return;
    }
    const id = allCheckboxes.length + 1;
    const itemData = {
        item: id,
        checked: false,
        value: value
    };

    itemDataArray.push(itemData);

    const itemDataArrayMap = itemDataArray;

    localStorage.setItem("items", JSON.stringify(itemDataArray));
    const item = `
    <div class="item">
    <input type="checkbox" name="item${id}" id="item${id}" />
    <label for="item${id}">${value}</label>
    </div>
    `;

    items.innerHTML += item;
    inputForm.reset();
    allCheckboxes = document.querySelectorAll("input[id^=item]");



    allCheckboxes.forEach((val) => {
        val.addEventListener("click", handleEvent);
        val.addEventListener("change", handleChecked);
    });

    console.clear();



}

inputForm.addEventListener("submit", submitForm);

window.addEventListener("load", () => {
    itemDataArray.forEach((obj, i) => {
        let checked;
        if (obj.checked) {
            checked = "checked";
        } else {
            checked = "";
        }

        const item = `
    <div class="item">
    <input type="checkbox" name="item${i+1}" id="item${i+1}" ${checked} />
    <label for="item${i+1}">${obj.value}</label>
    </div>
    `;

        items.innerHTML += item;
    });
    allCheckboxes = document.querySelectorAll("input[id^=item]");


    allCheckboxes.forEach((val) => {
        val.addEventListener("change", handleChecked);
        val.addEventListener("click", handleEvent);
    });
});