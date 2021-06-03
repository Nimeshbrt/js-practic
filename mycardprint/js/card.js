const names = document.querySelector("#name");
// const inputForName = document.querySelector("")
const designation = document.querySelector("#designation");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const address = document.querySelector("#location");
const logo = document.querySelectorAll("img.logo");
const companyName = document.querySelectorAll(".card-company");
const frontColor = document.querySelector(".left-bg");
const backColor = document.querySelector(".row.card-back");
const border = document.querySelector(".card-details");
const iconColor = document.querySelectorAll(".owner--details i");
const inputFBg = document.querySelector("#front-color");
const inputBBf = document.querySelector("#back-color");


function abc(e) {
    if (this.id == "inputName") {
        if (this.value != "") {
            names.innerHTML = (this.value);
        } else {
            names.innerHTML = "Zakir Raza";
        }
    }
    if (this.id == "inputDes") {
        if (this.value != "") {
            designation.innerHTML = this.value;
        } else {
            designation.innerHTML = "Project Manager";
        }
    }
    if (this.id == "inputPhone") {
        if (this.value != "") {
            phone.innerHTML = (this.value);
        } else {
            phone.innerHTML = "+977-9842163489";
        }
    }
    if (this.id == "inputEmail") {
        if (this.value != "") {
            email.innerHTML = (this.value);
        } else {
            email.innerHTML = "mutecoder@gmail.com";
        }
    }
    if (this.id == "inputAdd") {
        if (this.value != "") {
            address.innerHTML = (this.value);
        } else {
            address.innerHTML = "1990 Davis Place, Toledo, OH";
        }
    }
    if (this.id == "inputLogo") {
        if (this.value != "") {
            logo[0].src = window.URL.createObjectURL(this.files[0]);
            logo[1].src = window.URL.createObjectURL(this.files[0]);
        } else {
            return;
        }

    }
    if (this.id == "inputCompany") {
        if (this.value != "") {
            companyName[0].innerHTML = this.value;
            companyName[1].innerHTML = this.value;
        } else {
            companyName[0].innerHTML = "Mutecoder";
            companyName[1].innerHTML = "Mutecoder";
        }
    }

    if (this.id == "inputFcolor") {
        if (this.value != "") {
            frontColor.style.backgroundColor = this.value;
            inputFBg.style.backgroundColor = this.value;
            inputFBg.style.borderColor = this.value;
            border.style.borderColor = this.value;
            iconColor.forEach((item) => {
                item.style.color = this.value;
            })
        } else {
            frontColor.style.backgroundColor = "#000";
            inputFBg.style.backgroundColor = "";
            inputFBg.style.borderColor = "";
            border.style.borderColor = "#000";
            iconColor.forEach((item) => {
                item.style.color = "#000";
            })
        }

    }
    if (this.id == "inputBcolor") {
        if (this.value != "") {
            backColor.style.backgroundColor = this.value;
            inputBBf.style.backgroundColor = this.value;
            inputBBf.style.borderColor = this.value;
        } else {
            backColor.style.backgroundColor = "#000";
            inputBBf.style.backgroundColor = "";
            inputBBf.style.borderColor = "";
        }

    }
}

document.querySelectorAll("#inputs div input").forEach((val, i) => {
    val.addEventListener("change", abc);
    val.addEventListener("keyup", abc);
});

document.querySelector("#download").addEventListener("click", () => {
    var prtContent = document.getElementById("print");
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write('<link rel="stylesheet" href="./css/print.css" media="print">');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.setTimeout(function () {
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }, 1000);
});