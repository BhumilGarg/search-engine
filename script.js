let searchHistory = [];


fetch('search_history.json')
    .then(response => response.json())
    .then(data => searchHistory = data)
    .catch(error => console.error('Error loading search history:', error));
document.getElementById('search-button').addEventListener('click', search);
document.getElementById('clear-history-button').addEventListener('click', clearHistory);


function search(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
        searchHistory.push(searchTerm);
        storeSearchHistory();
        displaySearchHistory();
        document.getElementById('search-input').value = '';
    }
}


function clearHistory() {
    searchHistory = [];
    storeSearchHistory();
    displaySearchHistory();
}


function storeSearchHistory() {
    fetch('search_history.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchHistory)
    })
        .catch(error => console.error('Error storing search history:', error));
}


function displaySearchHistory() {
    const searchHistoryElement = document.getElementById('search-history');
    searchHistoryElement.innerHTML = '';
    searchHistory.forEach((searchTerm, index) => {
        const searchHistoryItem = document.createElement('div');
        searchHistoryItem.className = 'search-history-item';
        searchHistoryItem.textContent = `${index + 1}. ${searchTerm}`;
        searchHistoryElement.appendChild(searchHistoryItem);
    });
}