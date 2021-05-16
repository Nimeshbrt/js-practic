let map;
let markerClusterer = null;

/* Locations markers on the map. Format : { lat : number, lng : number} */
const locations = [];
const markersAll = [];

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

    markerClusterer = setMarkerCluster(markersAll);

}

// Loop for each marker in locations array
const setMarkers = (markers) => {
    markers.map((location, i) => {
        const marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            label: `${i+1}`,
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
        zoom: 7,
    });

    // Initiate marker cluster on map
    const marker = new google.maps.Marker({
        position: brt,
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

    markerClusterer = setMarkerCluster(markersAll);

    // console.log(markerClusterer);

}

const list = document.querySelectorAll("ul li.list");
const loading4 = document.querySelector("#loader");

const aR = (id) => {
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

    if (!id) {
        xhr.open("GET", `ajax.html`, true);
        xhr.addEventListener("load", function () {
            const allHTML = this.responseXML;
            // console.log(allHTML.querySelectorAll(`[data-modifier]`));
            const cardsall = allHTML.querySelectorAll(`[data-modifier]`);
            cardsall.forEach((val1) => {
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
            cardsall.forEach((val1) => {
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
    }

    addListeners(xhr);

    xhr.send();
};

list.forEach((tal) => {
    tal.addEventListener("click", (val) => {
        const dataId = Number(val.target.dataset.id);

        aR(dataId);
    });
});

const reset = document.querySelector("[data-id='reset']");

reset.addEventListener("click", () => {
    aR();
});
