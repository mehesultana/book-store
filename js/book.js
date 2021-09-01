const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);

    searchField.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    //console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.docs));
};

const displaySearchResult = (docs) => {
    console.log(docs);
    const searchResult = document.getElementById('search-result');
    docs?.forEach((doc) => {
        console.log(doc.author_name[0]);
        const { title } = doc.title;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                        <img src="https://covers.openlibrary.org/b/id/${doc?.cover_i}-M.jpg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h3 class="card-title">${doc.title.slice(0, 8)}</h3>
                            <h6 class="card-title text-warning">${doc.author_name[0]}</h6>
                            <h6 class="card-title">publisher: ${doc.publisher[0]}</h6>
                            
                        </div>
                    </div>
        `;
        searchResult.appendChild(div);
    });
};
