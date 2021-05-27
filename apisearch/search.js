const apiUrl =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

console.time("Fetching data");
const abc = fetch(apiUrl)
    .then((Response) => Response.json())
    .then((data) => {
        cities.push(...data);
        console.timeEnd("Fetching data");
    }).then(/* (data) => console.table(cities) */);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const filteredResult = (wordToMatch) => {
    const regex = new RegExp(wordToMatch, "gi"); // gi refers to global and caseinsensitive

    return cities.filter((citi) => {
        return citi.city.match(regex) || citi.state.match(regex);
    });
};

const input = document.querySelector("input");
const ul = document.querySelector("ul");

const putHTML = (results, value) => {
    const html = results
        .map((place) => {
            const regex = new RegExp(value, "gi");

            const cityName = place.city.replace(
                regex,
                `<span class="hl">${value}</span>`
            );
            const stateName = place.state.replace(
                regex,
                `<span class="hl">${value}</span>`
            );
            const population = numberWithCommas(place.population);

            return `<li><span class="name">${cityName}, ${stateName}</span><span class="population">${population}</span></li>`;
        })
        .join("");

    ul.innerHTML = html;
};

input.addEventListener("change", (e) => {
    const allResults = filteredResult(e.target.value);
    putHTML(allResults, e.target.value);
});

input.addEventListener("keyup", (e) => {
    const allResults = filteredResult(e.target.value);
    putHTML(allResults, e.target.value);
});
