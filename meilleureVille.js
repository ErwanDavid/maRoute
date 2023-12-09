const listCitiesDiv = document.getElementById("listCities")
var listCities = [];
var listCitiesCoord = [];

function handleError(err) {
    console.log("OH NO!");
    console.log(err);
}

function getDistCar(origin, destination, divToPop){
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
        divToPop.textContent = `Duration : ${routeDuration} hr - Distance :  ${routeLength} km  - CO2 :  ${co2Car} g`;
    })
    .catch(handleError);
}

function populateSelect(selectCurrent, c){
    for (let k in c) {
        //console.log(k + ' is ' + c[k]);
        const opt = document.createElement("option");
        opt.value = c[k];
        opt.text = k;
        selectCurrent.add(opt);
    }
}

// main


function addCity() {
    console.log("onclick");
    var innerDiv = document.createElement('div');
    var innerSelectOri = document.createElement('select');
    populateSelect(innerSelectOri, c);
    innerDiv.appendChild(innerSelectOri);
    var innerTextFrom = document.createElement('div');
    innerDiv.appendChild(innerTextFrom);
    listCitiesDiv.appendChild(innerDiv);

    innerSelectOri.addEventListener("change", function() {
        innerTextFrom.textContent = `${innerSelectOri.options[innerSelectOri.selectedIndex].text} - ${innerSelectOri.value} `;
        listCities.append(innerSelectOri.value);
        //getDistCar(innerSelectOri.value, innerSelectDest.value, innerTextResult);
    });
}

function addCity() {
    console.log("enter addCity");
    var innerDiv = document.createElement('div');
    var innerSelectOri = document.createElement('select');
    populateSelect(innerSelectOri, c);
    innerDiv.appendChild(innerSelectOri);
    var innerTextFrom = document.createElement('div');
    innerDiv.appendChild(innerTextFrom);
    listCitiesDiv.appendChild(innerDiv);

    innerSelectOri.addEventListener("change", function() {
        innerTextFrom.textContent = `${innerSelectOri.options[innerSelectOri.selectedIndex].text} - ${innerSelectOri.value} `;
        listCities.push(innerSelectOri.options[innerSelectOri.selectedIndex].text);
        listCitiesCoord.push(innerSelectOri.value);
        //getDistCar(innerSelectOri.value, innerSelectDest.value, innerTextResult);
    });
}


function launchCalc() {
    console.log("enter addCity");
    console.log(listCities);
    console.log(listCitiesCoord);

}