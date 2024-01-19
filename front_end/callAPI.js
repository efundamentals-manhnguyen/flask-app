let getBookApi = "http://127.0.0.1:5000/book-management/books"
let getCategoryApi = "http://127.0.0.1:5000/category-management/categories"
let getAuthorApi = "http://127.0.0.1:5000/author-management/authors"

async function loadBooks(){
    let listBooks = await fetch(getBookApi).then(res => res.json());
    return listBooks;
}

async function loadCategories(){
    let listCategories = await fetch(getCategoryApi).then(res => res.json());
    return listCategories
}

async function loadAuthors(){
    let listAuthors= await fetch(getAuthorApi).then(res => res.json());
    return listAuthors
}

