const dataElem = document.querySelector(".data");
const fromElem = document.querySelector(".from");
const toElem = document.querySelector(".to");
const selectOrigin = document.getElementById("selectOrigin");
const selectDest = document.getElementById("selectDest");

function handleError(err) {
    console.log("OH NO!");
    console.log(err);
}

function getDistCar(origin, destination){
    const apiKey = 'CvjYcBmQlFCLAT5LePmt55qJo1OXt2mnjZW5hXSDLyM';
    var url = new URL("https://router.hereapi.com/v8/routes");
    params = {origin:origin, destination:destination, transportMode:'car',return:'summary', apikey:apiKey}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const wesPromise = fetch(url);
    wesPromise
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        var routeSummary = data.routes[0].sections[0].summary
        var routeDuration = routeSummary.duration /3600     // second to h
        var routeLength = routeSummary.length / 1000        // m to km
        var co2Car = routeLength * 130                      // km to co2 using 130 g/km co2
        console.log(routeSummary);
        dataElem.textContent = `Duration : ${routeDuration} hr - Distance :  ${routeLength} km  - CO2 :  ${co2Car} g`;
    })
    .catch(handleError);
}

function populateSelect(selectCurrent, c){
    for (let k in c) {
        console.log(k + ' is ' + c[k]);
        const opt = document.createElement("option");
        opt.value = c[k];
        opt.text = k;
        selectCurrent.add(opt);
    }
}

// main

populateSelect(selectOrigin, c);
populateSelect(selectDest, c);

selectOrigin.addEventListener("change", function() {
    fromElem.textContent = `From ${selectOrigin.options[selectOrigin.selectedIndex].text} ${selectOrigin.value}`;
    getDistCar(selectOrigin.value, selectDest.value);
});
selectDest.addEventListener("change", function() {
    toElem.textContent = `To ${selectDest.options[selectDest.selectedIndex].text} ${selectDest.value}`;
    getDistCar(selectOrigin.value, selectDest.value);
});
