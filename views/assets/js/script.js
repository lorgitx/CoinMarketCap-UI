const APPCONFIG = {
    API: "http://127.0.0.1:4000",
};

let getPricesInvterval;

//Execute when the DOM is loaded
document.addEventListener("DOMContentLoaded", (event) => {
    startFetchingData();
});

//Start Fetching Prices
function startFetchingData() {
    GetPrices();
    getPricesInvterval = setInterval(GetPrices, 50000);
}

//Get prices list
async function GetPrices() {
    const prices = await FetchData(APPCONFIG.API + "/coin/price/");
    if (!prices)
        return;
    renderTable(prices);
}

function renderTable(prices) {

    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    prices.forEach(item => {
        const coinData = item.split(":");

        const row = document.createElement('tr');
        row.innerHTML = `
              <td>${coinData[0]}</td>
              <td>${coinData[1]}</td>
              <td>0.68%	</td>
              <td>5.87%</td>
              <td>4.58%</td>
              <td>$1,957,101,297,152</td>
            `;
        tableBody.appendChild(row);
    });
}

//Handle fetchs
async function FetchData(url) {
    try {
        const opts = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //This can be a header object or literal string object {''}
        };
        const response = await fetch(url, opts);
        if (!response.ok) {
            console.log(2);
            throw new Error(`HTTP Status: ${response.status}`);

        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}