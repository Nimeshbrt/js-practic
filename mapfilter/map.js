let map;
let markerClusterer = null;
let newMapLoc;
let infowindow;
let lastClickedFilter = null;
console.log("The last clicked Filter was " + lastClickedFilter);

/* Locations markers on the map pulled from div's in DOM. Format : { lat : number, lng : number} */
const locations = [];

// all markers in an array
const markersAll = [];

const avgMarkersLat = [];
const avgMarkersLng = [];

let cards = document.querySelectorAll(".card");
cards.forEach((val, index) => {
    const lat = val.dataset.lat;
    const lng = val.dataset.lng;
    const obj = {
        lat: Number(lat),
        lng: Number(lng),
    };
    // console.log(val.dataset);
    locations.push(obj);
});

const findAvg = (...xyz) => {
    let sum = 0;
    xyz.forEach((val) => (sum += val));
    return sum / xyz.length;
};

function reloadMarkers() {
    // Loop through markers and set map to null for each
    markersAll.forEach((location, i) => {
        location.setMap(null);
    });

    // Reset the markers array
    markersAll.splice(0);

    // Call set markers to re-add markers
    // console.log(markerClusterer);

    markerClusterer.clearMarkers();

    setMarkers(locations);

    let all1 = findAvg(...avgMarkersLat);

    let all2 = findAvg(...avgMarkersLng);

    newMapLoc = {
        lat: all1,
        lng: all2,
    };

    map.setCenter(newMapLoc);
    map.setZoom(2);

    // console.log(newMapLoc);

    markerClusterer = setMarkerCluster(markersAll);
}

// Loop for each marker in locations array
const setMarkers = (markers) => {
    avgMarkersLat.splice(0);
    avgMarkersLng.splice(0);

    markers.map((location, i) => {
        const marker = new google.maps.Marker({
            position: location,
            // animation: google.maps.Animation.DROP,
            label: `${i + 1}`,
            title: `Hello world ${i + 1}`,
        });

        // on click animate marker
        // marker.addListener("click", toggleBounce);

        const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '<div id="bodyContent">' +
            "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
            "sandstone rock formation in the southern part of the " +
            "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
            "south west of the nearest large town, Alice Springs; 450&#160;km " +
            "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
            "features of the Uluru - Kata Tjuta National Park. Uluru is " +
            "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
            "Aboriginal people of the area. It has many springs, waterholes, " +
            "rock caves and ancient paintings. Uluru is listed as a World " +
            "Heritage Site.</p>" +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
            "(last visited June 22, 2009).</p>" +
            "</div>" +
            "</div>";

        infowindow = new google.maps.InfoWindow({
            content: contentString,
        });

        marker.addListener("click", () => {
            if (infowindow) {
                infowindow.close();
            }
            infowindow = new google.maps.InfoWindow({
                content: contentString,
            });

            infowindow.open(map, marker);
        });

        //function to animate marker
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

        const lat = marker.getPosition().lat();
        const lng = marker.getPosition().lng();

        avgMarkersLat.push(lat);
        avgMarkersLng.push(lng);

        markersAll.push(marker);
    });
};

// Add a marker clusterer image to manage the markers.
const setMarkerCluster = (markers) => {
    return new MarkerClusterer(map, markers, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
};

function initMap() {
    const brt = {
        lat: 26.56391,
        lng: 87.154312,
    };

    // Initate first marker on map with zoom
    map = new google.maps.Map(document.getElementById("gmap"), {
        center: brt,
        zoom: 3,
    });

    // Initiate marker cluster on map
    const marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
    });

    // on click animate marker
    marker.addListener("click", toggleBounce);

    //function to animate marker
    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    // markersAll.splice(0);

    setMarkers(locations);

    let all1 = findAvg(...avgMarkersLat);

    let all2 = findAvg(...avgMarkersLng);

    newMapLoc = {
        lat: all1,
        lng: all2,
        zoom: 2,
    };

    // console.log(newMapLoc);

    map.setCenter(newMapLoc);
    map.setZoom(2);

    markerClusterer = setMarkerCluster(markersAll);

    // console.log(markerClusterer);
}

const list = document.querySelectorAll("ul li.list");
const loading4 = document.querySelector("#loader");

const aR = (id = lastClickedFilter, page = 1) => {
    const allCards = document.querySelector("#cardsall");
    const xhr = new XMLHttpRequest();

    function handleEvent(e) {
        allCards.innerHTML = "";
        // console.log(`Loading....`);
        loading4.classList.add("classic-4");
    }

    function handleEvent1(e) {
        // console.log(`Loaded successfully`);
        loading4.classList.remove("classic-4");
    }

    function addListeners(xhr) {
        xhr.addEventListener("progress", handleEvent);
        xhr.addEventListener("load", handleEvent1);
    }

    xhr.responseType = "document";
    const mainContainer = document.querySelector(`#pagination`);

    if (!id) {
        xhr.open("GET", `ajax.html`, true);
        xhr.addEventListener("load", function () {
            const allHTML = this.responseXML;
            // console.log(allHTML.querySelectorAll(`[data-modifier]`));
            const cardsall = allHTML.querySelectorAll(`[data-modifier]`);
            const NumberOfPages = Math.ceil(cardsall.length / 10);

            if (cardsall.length >= 10) {
                console.log("The number of pages is " + NumberOfPages);
                mainContainer.innerHTML = "";

                for (let i = 0; i < NumberOfPages; i++) {
                    const createPagination = document.createElement("a");
                    createPagination.innerText = i + 1;
                    if (page == (i + 1)) {
                    createPagination.classList.add(`page-active`);
                    }
                    createPagination.classList.add(`page-${i + 1}`);
                    createPagination.setAttribute("data-pageid", i + 1);
                    mainContainer.append(createPagination);
                }
            }

            paginationAll = document.querySelectorAll('[class^="page"]');
            paginationAll.forEach((val) => {
                val.addEventListener("click", (clickw) => {
                    const idOfpage = clickw.target.dataset.pageid;
                    console.log(idOfpage);
                    aR(lastClickedFilter, idOfpage);
                });
            });

            const from = (page - 1) * 10;
            const to = 10;

            const pagedCards = [...cardsall];

            const pagedCardsFiltered = pagedCards.splice(from, to);

            console.log(pagedCards.splice(from, to));

            pagedCardsFiltered.forEach((val1, i) => {
                allCards.innerHTML += val1.outerHTML;
            });

            locations.splice(0);
            let cards1 = document.querySelectorAll(".card");
            cards1.forEach((val, index) => {
                const lat = val.dataset.lat;
                const lng = val.dataset.lng;
                const obj = {
                    lat: Number(lat),
                    lng: Number(lng),
                };
                locations.push(obj);
            });
            reloadMarkers();
        });
    } else {
        xhr.open("GET", `ajax.html`, true);
        xhr.addEventListener("load", function () {
            const allHTML = this.responseXML;
            // console.log(allHTML.querySelectorAll(`[data-modifier="${id}"]`));
            const cardsall = allHTML.querySelectorAll(
                `[data-modifier="${id}"]`
            );

            const NumberOfPages = Math.ceil(cardsall.length / 10);

            if (cardsall.length >= 10) {
                console.log("The number of pages is " + NumberOfPages);

                mainContainer.innerHTML = "";

                for (let i = 0; i < NumberOfPages; i++) {
                    const createPagination = document.createElement("a");
                    createPagination.innerText = i + 1;
                    if (page == (i + 1)) {
                        createPagination.classList.add(`page-active`);
                    }
                    createPagination.classList.add(`page-${i + 1}`);
                    createPagination.setAttribute("data-pageid", i + 1);
                    mainContainer.append(createPagination);
                }
            }

            paginationAll = document.querySelectorAll('[class^="page"]');
            paginationAll.forEach((val) => {
                val.addEventListener("click", (clickw) => {
                    const idOfpage = clickw.target.dataset.pageid;
                    console.log(idOfpage);
                    aR(lastClickedFilter, idOfpage);
                });
            });

            const from = (page - 1) * 10;
            const to = 10;

            const pagedCards = [...cardsall];

            const pagedCardsFiltered = pagedCards.splice(from, to);

            console.log(pagedCards.splice(from, to));

            pagedCardsFiltered.forEach((val1, i) => {
                allCards.innerHTML += val1.outerHTML;

                // allCards.innerHTML += val1.outerHTML;
            });
            locations.splice(0);
            let cards1 = document.querySelectorAll(".card");
            cards1.forEach((val, index) => {
                const lat = val.dataset.lat;
                const lng = val.dataset.lng;
                const obj = {
                    lat: Number(lat),
                    lng: Number(lng),
                };
                locations.push(obj);
            });
            reloadMarkers();
        });
    }

    addListeners(xhr);

    xhr.send();
};

list.forEach((tal) => {
    tal.addEventListener("click", (val) => {
        const dataId = Number(val.target.dataset.id);
        lastClickedFilter = dataId;
        console.log("The last clicked Filter was " + lastClickedFilter);
        aR(dataId);
    });
});

// let paginationAll = document.querySelectorAll('[class^="page"]');
// paginationAll.forEach((val) => {
//     val.addEventListener("click", (clickw) => {
//         const idOfpage = clickw.target.dataset.pageid;
//         console.log(idOfpage);
//         aR(lastClickedFilter, idOfpage);
//         clickw.target.classList.add("page-active");
//     });
// });

const reset = document.querySelector("[data-id='reset']");

reset.addEventListener("click", () => {
    lastClickedFilter = null;
    console.log("The last clicked Filter was " + lastClickedFilter);
    aR();
});

// console.clear();
