

async function getData() {
    return await fetch('https://api.covid19api.com/summary')

        .then(response => response.json())
        .catch(error => {
            console.error('can not get data', error)
        })

}


function updateView(data) {
    console.log(data);


    document.querySelector('.TotalDeaths .data').innerText = parseNumberToString(data.Global.TotalDeaths);
    document.querySelector('.TotalConfirmed .data').innerText = parseNumberToString(data.Global.TotalConfirmed);
    document.querySelector('.TotalRecovered .data').innerText = parseNumberToString(data.Global.TotalRecovered);
    document.querySelector('.Date').innerText = new Date(data.Date).toLocaleDateString('es-ES');

}



function parseNumberToString(num, decimalLength = 0, decimalsChar = ',', milesChar = '.') {
    if (typeof num !== 'number') return num;

    const fixed = num
        .toFixed(decimalLength)
    // .replace('.', '')

    let [intPart, decimalPart] = fixed.split(decimalsChar)
    intPart = intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + milesChar)
    return [intPart, decimalPart].join('')

}


function getImage() {
    const options = {
     headers: new Headers({ Authorization: `Client-ID ${'1VOqarasy1vFUP7PU01LKgTxMLJKEUAihky9XV4WM0c'}` })
    }
    return fetch('https://api.unsplash.com/photos/random?query=covid-19', options)
        .then(r => r.json())
}

function updateBackground(data) {
    console.log(data);

    document.querySelector('body').style.backgroundImage = `url('${data.urls.regular}')`;


}

document.querySelector('.update').addEventListener('click', () => {

    getData().then(data => updateView(data))
    getImage().then(updateBackground);
})
getData().then(data => updateView(data))
getImage().then(updateBackground);


if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./sw.js')
    .then(function() { console.log('Service Worker Registered'); });
    }
