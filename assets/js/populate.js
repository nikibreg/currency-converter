const API_ENDPOINT = `https://api.exchangeratesapi.io/latest`;

const data = {
    base: null,
    rates: null,
    date: null
}

async function fetchApi(base = "EUR") {
    const response = await fetch(`${API_ENDPOINT}?base=${base}`)
    const json = await response.json()
    return json
}

function populateSelectors(rates = data.rates) {
    const leftSelector = document.getElementById('left-selector')
    const rightSelector = document.getElementById('right-selector')

    for (const symbol in rates) {
        if (rates[symbol]) {
            const rate = rates[symbol];

            const option = document.createElement('option');
            option.innerText = symbol;
            option.value = rate;
            
            leftSelector.innerHTML += option.outerHTML
            rightSelector.innerHTML += option.outerHTML
        }
    }
}

function populateDate(date = data.date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    
    document.getElementById('date').innerText = formattedDate
}

async function populate(base) {
    const newData = await fetchApi(base);
    Object.assign(data, newData);
    populateSelectors();
    populateDate()
}

populate()

