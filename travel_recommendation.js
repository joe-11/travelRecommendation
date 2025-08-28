const resultsContainer = document.getElementById('results-container');

function search(){
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    if(searchInput === ''){
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        alert('Please enter a keyword to search!');
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const travelData = data;
            console.log('fetching travel data done!');
            console.log(data);
        })
        .catch(error => console.error('Error fetching travel data', error));


    
}

