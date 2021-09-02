const searchResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error');
const totalResult = document.querySelector('#total-result');
const loadingSpinner = document.getElementById('loadingSpinner');
const searchField = document.getElementById('search-field');
const buttonSearch = document.getElementById('buttonSearch');

// loading spinner
const toggleSpinner = (show) => {
    const spinner = loadingSpinner;
    // console.log(spinner);
    show ? spinner.classList.remove('d-none') : spinner.classList.add('d-none');
};

// get data and search book
const searchBook = async () => {
    toggleSpinner(true);

    const searchText = searchField.value;
    //console.log(searchText);

    //clear data
    searchField.value = '';
    searchResult.textContent = '';
    totalResult.textContent = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data))
        .catch((error) => console.log(error));
};

//search result
const displaySearchResult = (bookData) => {
    toggleSpinner(false);
    // console.log(bookData);

    const total = bookData.numFound;
    // console.log(total);

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h5>total result : ${total}</h5>`;

    totalResult.appendChild(totalDiv);

    const books = bookData.docs;
    // console.log(books);

    books?.forEach((doc) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${doc?.cover_i}-M.jpg" 
                    class="card-img-top " alt="Not found" />
                <div class="card-body">
                    <h3 class="card-title">${doc.title.slice(0, 8)}</h3>
                    <h6 class="card-title text-warning">${doc.author_name?.[0]}</h6>
                    <h6 class="card-title">Publisher: ${doc.publisher?.[0]}</h6>
                    <h6 class="card-title">Publish Year: ${doc.publish_year?.[0]}</h6>
                            
                            
                </div>
        </div>
        `;

        searchResult.appendChild(div);
    });
};

// search  hit enter
searchField.addEventListener('keypress', (event) => {
    // console.log('keyb', event.key);
    if (event.key === 'Enter') {
        buttonSearch.click();
    }
});
