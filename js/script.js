let amount = document.getElementById("amount");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");

let total;
let countryList = [];
const apiKey = '18da55258604003e975b';
const initURL = 'https://free.currconv.com/api/v7/';
let typeList = [
    'convert',
    'currencies',
    'countries'
];

getListCountries();

function getListCountries() {
    let completeURL = initURL + typeList[2] + '?apiKey=' + apiKey;
    console.log(completeURL)
    fetch( completeURL)
        .then(response => response.json())
        .then(data => {
            let results = data.results;
            for(let i in results){
                countryList.push({name: results[i].name,currencyId: results[i].currencyId});
            }
        })
        .finally(()=>{
            countryList.sort(function (a, b) {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
            for(let country in countryList){
                from.innerHTML += `
                  <option value=${countryList[country].currencyId}>${countryList[country].name}</option>  
                `;
                to.innerHTML += `
                  <option value=${countryList[country].currencyId}>${countryList[country].name}</option>  
                `;
            }
            document.querySelector("#loader").style.display = "none";
        })
}
function showResult() {
    document.querySelector("#loader").style.display = "flex";
    const amountValue = amount.value;
    const fromValue = from.value;
    const toValue = to.value;
    const combinedData = fromValue + '_' + toValue;
    let completeURL = initURL + typeList[0] + '?q=' + combinedData + '&compact=ultra&apiKey=' + apiKey;
    console.log(completeURL)
    fetch( completeURL)
        .then(response => response.json())
        .then(data => {
            total =  amountValue * data[combinedData];
            total = total.toFixed(3);
            result.innerHTML = total;
            addTableRow(fromValue, toValue, amountValue, total);
            amount.value = null;
            amount.autofocus = true;
        })
}
function addTableRow(fromValue, toValue, amountValue, resultValue) {
    let currentTime = new Date();
    let resultTable = document.getElementById("resultTable");
    let row = document.createElement("tr");
    let timeCol = document.createElement("td");
    let fromCol = document.createElement("td");
    let toCol = document.createElement("td");
    let resultCol = document.createElement("td");

    let timeTextNode = document.createTextNode(currentTime.toLocaleString());
    let fromTextNode = document.createTextNode(amountValue + " " + fromValue);
    let toTextNode = document.createTextNode(toValue);
    let resultTextNode = document.createTextNode(resultValue);
    timeCol.appendChild(timeTextNode);
    fromCol.appendChild(fromTextNode);
    toCol.appendChild(toTextNode);
    resultCol.appendChild(resultTextNode);

    row.appendChild(timeCol);
    row.appendChild(fromCol);
    row.appendChild(toCol);
    row.appendChild(resultCol);

    resultTable.appendChild(row);
    document.querySelector("#loader").style.display = "none";
}

