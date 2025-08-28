const resultsContainer = document.getElementById('results-container');
let travelData = null;

fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log('fetching travel data done!');
            console.log(data);
            travelData = data;
        })
        .catch(error => console.error('Error fetching travel data', error));

function search(){
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    if(searchInput === ''){
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        alert('Please enter a keyword to search!');
        return;
    }   

    resultsContainer.style.display = 'none';
    resultsContainer.innerHTML = '';

    const countryResults = travelData.countries.flatMap(country =>
        country.cities.filter(city => 
        city.name.toLowerCase().includes(searchInput) || 
        city.description.toLowerCase().includes(searchInput)));

    const beachResults = travelData.beaches.filter(beach =>
        beach.name.toLowerCase().includes(searchInput) || 
        beach.description.toLowerCase().includes(searchInput));

    const templeResults = travelData.temples.filter(temple =>
        temple.name.toLowerCase().includes(searchInput) || 
        temple.description.toLowerCase().includes(searchInput));

    const allResults = [...countryResults, ...beachResults, ...templeResults];

    if(allResults.length > 0){
        displayResults(allResults);
    } else{
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        alert('No result found!');
    }    
    
}

function resetResults(){
    document.getElementById('search-bar').value = '';
    resultsContainer.style.display = 'none';
    resultsContainer.innerHTML = '';
}

function displayResults(results){
    results.forEach(result => {
        const resultHTML = `
        <div class="city-card">
            <img src="${result.imageUrl}" alt="${result.name}"/>
            <h3>${result.name}</h3>
            <p>${result.description}</p>
            <button>Visit</button>
        </div>`; 
        resultsContainer.innerHTML += resultHTML;
    });

    resultsContainer.style.display = 'flex';
}

