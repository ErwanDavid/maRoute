const listCitiesDiv = document.getElementById("listCities")
var listCities = [];
var listCitiesCoord = [];
var listCitiesco2 = {};

function handleError(err) {
    console.log("OH NO!");
    console.log(err);
}

function getSumMoves(listTxt, listCoord, i){
    console.log("getSumMoves");
    const length = listTxt.length;
    var sumMove = 0
    for (let j = 0; j < length; j++) {
        console.log(listTxt[i] + " with " + listTxt[j]);
        if (listTxt[i] == listTxt[j]) {
            sumMove += 0;
        }
        else{
            sumMove +=  getDistCar(listTxt[i], listCoord[i], listCoord[j]);
        }
    }
    return sumMove;
}


function getDistCar(originTxt,origin, destination){
    console.log("getDistCar");
    var co2Car = 0;
    var allPromise = [];
    const apiKey = 'CvjYcBmQlFCLAT5LePmt55qJo1OXt2mnjZW5hXSDLyM';
    var url = new URL("https://router.hereapi.com/v8/routes");
    params = {origin:origin, destination:destination, transportMode:'car',return:'summary', apikey:apiKey}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const wesPromise =  fetch(url);
    wesPromise
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        var routeSummary = data.routes[0].sections[0].summary
        var routeDuration = routeSummary.duration /3600     // second to h
        var routeLength = routeSummary.length / 1000        // m to km
        co2Car = routeLength * 130 / 1000                   // km to kg co2 using 130 g/km co2
        //console.log(routeSummary);
        var str = `Duration : ${routeDuration} hr - Distance :  ${routeLength} km  - CO2 :  ${co2Car} kg`;
        console.log(str);
        curTxt = listCitiesco2[originTxt];
        curCo2 = curTxt.innerText;
        total = parseFloat(curCo2) + co2Car
        curTxt.textContent=total;
    })
    .catch(handleError);
}

function populateSelect(selectCurrent, c){
    const opt = document.createElement("option");
    opt.value = "0,0";
    opt.text = "Select a city";
    selectCurrent.add(opt);
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
    console.log("addCity");
    var innerDiv = document.createElement('div');
    innerDiv.classList.add("innerDiv");
    var innerSelectOri = document.createElement('select');
    populateSelect(innerSelectOri, c);
    innerDiv.appendChild(innerSelectOri);
    var innerTextFrom = document.createElement('div');
    innerTextFrom.classList.add("innerTextFrom");
    innerDiv.appendChild(innerTextFrom);
    listCitiesDiv.appendChild(innerDiv);

    innerSelectOri.addEventListener("change", function() {
        innerTextFrom.textContent = `${innerSelectOri.options[innerSelectOri.selectedIndex].text} - ${innerSelectOri.value} `;
        listCitiesCoord.push(innerSelectOri.value);
        listCities.push(innerSelectOri.options[innerSelectOri.selectedIndex].text);
        var innerTextCo2 = document.createElement('div');
        innerTextCo2.classList.add("innerTextFrom");
        innerTextCo2.textContent = 0;
        innerDiv.appendChild(innerTextCo2);
        listCitiesco2[innerSelectOri.options[innerSelectOri.selectedIndex].text] = innerTextCo2;
        //getDistCar(innerSelectOri.value, innerSelectDest.value, innerTextResult);
    });
}



function launchCalc() {
    console.log("enter launchCalc");
    totScore = scoreHypothese(listCities, listCitiesCoord);
    console.log("totScore");
    console.log(totScore);
}

function scoreHypothese(listTxt, listCoord){
    console.log("scoreHypothese");
    var score = {};
    const length = listTxt.length;
    for (let i = 0; i < length; i++) {
        console.log("Working on " + listTxt[i]);
        totalCo2 = getSumMoves(listTxt, listCoord, i);
        score[listTxt[i]] = totalCo2;
    }
    return score;
}