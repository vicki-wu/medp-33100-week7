function fetchData() {
    return fetch('books.json')
        .then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            return data;
        })
}