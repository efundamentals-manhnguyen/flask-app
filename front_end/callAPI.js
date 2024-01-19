let getBookApi = "http://127.0.0.1:5000/book-management/books"

async function loadBooks(){
    let listBooks = await fetch(getBookApi).then(res => res.json());
    return listBooks;
}

