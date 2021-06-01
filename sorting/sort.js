const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// console.log(bands);

const items = document.querySelector('#items');

items.innerHTML = '';

const li = document.createElement("li");
li.classList.add('item');

const abc =[...bands];
// bands.forEach((item) => {
//    abc.push(item.replace(/^(a|an|the)/i, "").trim());
    
// })

abc.sort();

abc.forEach((val, i) => {
    items.innerHTML += `<li class="item">${val}</li>`;
});