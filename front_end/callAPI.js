let getBookApi = "http://127.0.0.1:5000/book-management/books"
let getCategoryApi = "http://127.0.0.1:5000/category-management/categories"
let getAuthorApi = "http://127.0.0.1:5000/author-management/authors"

async function loadBooks(){
    let listBooks = await fetch(getBookApi).then(res => res.json());
    return listBooks;
}

async function loadCategories(){
    let listCategories = await fetch(getCategoryApi).then(res => res.json());
    let categoryAndBookCount = []
    const books = await loadBooks();
    listCategories.forEach(category =>{
        let bookCountBycategory = 0;
        books.Books.forEach(book => {
            if(category.id == book[4]){
                bookCountBycategory += 1
            }
        })
        let data = {name: category.name, count: bookCountBycategory}
        categoryAndBookCount.push(data)
    })
    return categoryAndBookCount
}

async function loadAuthors(){
    let listAuthors= await fetch(getAuthorApi).then(res => res.json());
    let authorAndBookCount = []
    const books = await loadBooks();
    listAuthors.forEach(author => {
        let bookCountByAuthor = 0;
        books.Books.forEach(book => {
            if(author.id == book[3]){
                bookCountByAuthor += 1 
            }
        })
        let data = {name: author.name, count: bookCountByAuthor}
        authorAndBookCount.push(data)
    });
    return authorAndBookCount
}

