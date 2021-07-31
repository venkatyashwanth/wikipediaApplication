let searchInputEl = document.getElementById('searchInput');
let diplayInputEl = document.getElementById("diplayInput");
let searchResultsContainer = document.getElementById('searchResultsContainer');

let spinnerEl = document.getElementById("spinner1");

function createAndAppendSearchItem(searchEl){
    let {link,title,description} = searchEl;
    
    let searchItem = document.createElement('div');
    searchItem.classList.add('search-border');
    searchResultsContainer.appendChild(searchItem);

    let titleText = document.createElement('a');
    titleText.href = link;
    titleText.target='_blank';
    titleText.textContent = title;
    titleText.classList.add('titleStyle')
    searchItem.appendChild(titleText);

    let breakElement = document.createElement('br');
    searchItem.appendChild(breakElement);

    let linkText = document.createElement("a");
    linkText.href = link;
    linkText.target = "_blank";
    linkText.textContent = link;
    linkText.classList.add('linkStyle');
    searchItem.appendChild(linkText);

    let descriptionText = document.createElement('p');
    descriptionText.textContent = description;
    descriptionText.classList.add('descriptionStyle');
    searchItem.appendChild(descriptionText);
}



function displayResults(searchResult){
    spinnerEl.classList.toggle('d-none');
    let searchEl = searchResult;
    for(let searchItem of searchEl){
        createAndAppendSearchItem(searchItem);
    }
    let searchBox = document.getElementById('searchResultsContainer');
    let endMessageEl = document.createElement('p');
    endMessageEl.textContent = 'End of Search';
    searchBox.appendChild(endMessageEl);
}

function searchWikipedia(event){
    if(event.key === 'Enter'){
        spinnerEl.classList.toggle('d-none');
        searchResultsContainer.textContent = '';
        let searchContent = event.target.value;
        let url = 'https://apis.ccbp.in/wiki-search?search='+searchContent;
        let options = {
            method: 'GET',
        };
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results} = jsonData;
            displayResults(search_results);
        });
        event.target.value = '';
    } 
}

searchInputEl.addEventListener('keydown',searchWikipedia);