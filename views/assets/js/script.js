const APPCONFIG = {
    API: "/api"
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

    for (const key in prices) {
        if (Object.prototype.hasOwnProperty.call(prices, key)) {
            
            if(prices[key].usd_market_cap == 0)  continue;

            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${prices[key].name}</td>
              <td>${prices[key].usd}</td>
              <td>${prices[key].usd_24h_change.toFixed(1)}%</td>    
              <td>${prices[key].usd_market_cap.toFixed(0)}</td>
            `;
            tableBody.appendChild(row);
        }
    }

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
       
            throw new Error(`HTTP Status: ${response.status}`);

        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}