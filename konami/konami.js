const allTyped = [];
const names = "nimesh";

document.addEventListener("keyup", (e) => {
    allTyped.push(e.key);
    allTyped.splice(0, (allTyped.length - 6));
    if(allTyped.join("").includes(names)){
        cornify_add();
        console.log(allTyped.join(""));
    }
});
