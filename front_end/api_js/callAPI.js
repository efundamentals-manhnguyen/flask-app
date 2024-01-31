let getBookApi = "http://127.0.0.1:5000/book-management/books"
let getCategoryApi = "http://127.0.0.1:5000/category-management/categories"
let getAuthorApi = "http://127.0.0.1:5000/author-management/authors"
let getBookByAuthor = "http://127.0.0.1:5000/book-management/book/author/"
let getBookByCategory = "http://127.0.0.1:5000/book-management/book/category/"




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
        let data = {id: category.id, name: category.name, count: bookCountBycategory}
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
        let data = {id: author.id, name: author.name, count: bookCountByAuthor}
        authorAndBookCount.push(data)
    });
    return authorAndBookCount
}

async function loadBooksByAuthor(authorName){
    await  fetch(getBookByAuthor + authorName).then(function(res){
        return res.json();
    })
    .then(function(books){
        if(books.message !== "Books not found"){
            let html = "";
            books.Books.forEach(function(book){
                html += `<div class="col-md-4 col-xs-6">
                            <div class="product">
                                <div class="product-img">
                                    <img src="./img/${book[1]}.webp" alt="">
                                </div>
                                <div class="product-body">
                                    <p class="product-category">${book[2]}</p>
                                    <h3 class="product-name"><a href="#">${book[0]}</a></h3>
                                    <div class="product-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="product-btns">
                                        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span
                                            class="tooltipp">add to wishlist</span></button>
                                            <button class="add-to-compare"><i class="fa fa-exchange"></i><span
                                                class="tooltipp">add to compare</span></button>
                                            <button class="quick-view" onclick="quickViewFunction(${book[5]})"><i class="fa fa-eye"></i><span class="tooltipp">quick
                                            view</span></button>
                                            </div>
                                            </div>
                                            <div class="add-to-cart">
                                            <button class="add-to-cart-btn" onclick="borrowFunction(${book[5]})"><i class="fa fa-shopping-cart"></i>Borrow</button>
                                    </div>
                                </div>
                            </div>`
            })
            document.querySelector("#store > .row").innerHTML = "";
            document.querySelector("#store > .row").innerHTML = html;
        }else{
            document.querySelector("#store > div:nth-of-type(3)").remove();
            document.querySelector("#store > .row").innerHTML = books.message;
        }
    })
    .catch(function(error){
        return error
    })
   
}

async function loadBooksByCategory(categoryName){
    await  fetch(getBookByCategory + categoryName).then(function(res){
        return res.json();
    })
    .then(function(books){
        if(books.message !== "Books not found"){
            let html = "";
            books.Books.forEach(function(book){
                html += `<div class="col-md-4 col-xs-6">
                            <div class="product">
                                <div class="product-img">
                                    <img src="./img/${book[1]}.webp" alt="">
                                </div>
                                <div class="product-body">
                                    <p class="product-category">${book[2]}</p>
                                    <h3 class="product-name"><a href="#">${book[0]}</a></h3>
                                    <div class="product-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="product-btns">
                                        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span
                                            class="tooltipp">add to wishlist</span></button>
                                            <button class="add-to-compare"><i class="fa fa-exchange"></i><span
                                                class="tooltipp">add to compare</span></button>
                                            <button class="quick-view" onclick="quickViewFunction(${book[5]})"><i class="fa fa-eye"></i><span class="tooltipp">quick
                                            view</span></button>
                                            </div>
                                            </div>
                                            <div class="add-to-cart">
                                            <button class="add-to-cart-btn" onclick="borrowFunction(${book[5]})"><i class="fa fa-shopping-cart"></i>Borrow</button>
                                    </div>
                                </div>
                            </div>`
            })
            document.querySelector("#store > .row").innerHTML = "";
            document.querySelector("#store > .row").innerHTML = html;
        }else{
            document.querySelector("#store > div:nth-of-type(3)").remove();
            document.querySelector("#store > .row").innerHTML = books.message;
        }
    })
    .catch(function(error){
        return error
    })
   
}

// Onclick function passing book_id to book detail page
function quickViewFunction(id)
{
    window.location='./book_detail_page.html?book_id='+id;
}


// Onclick function passing book_id to borrow page
function borrowFunction(id)
{
    window.location='./borrow_book_page.html?book_id='+id;
}


document.addEventListener("DOMContentLoaded", async () => {
    const books = await loadBooks();
    books.Books.forEach(book => {
        const productHtml =`
                <div class="col-md-4 col-xs-6">
                            <div class="product">
                                <div class="product-img">
                                    <img src="./img/${book[1]}.webp" alt="">
                                </div>
                                <div class="product-body">
                                    <p class="product-category">${book[2]}</p>
                                    <h3 class="product-name"><a href="#">${book[0]}</a></h3>
                                    <div class="product-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="product-btns">
                                        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span
                                                class="tooltipp">add to wishlist</span></button>
                                        <button class="add-to-compare"><i class="fa fa-exchange"></i><span
                                                class="tooltipp">add to compare</span></button>
                                        <button class="quick-view" onclick="quickViewFunction(${book[5]})"><i class="fa fa-eye"></i><span class="tooltipp">quick
                                                view</span></button>
                                    </div>
                                </div>
                                <div class="add-to-cart">
                                    <button class="add-to-cart-btn" onclick="borrowFunction(${book[5]})"><i class="fa fa-shopping-cart"></i>Borrow</button>
                                </div>
                            </div>
                </div>`
        document.querySelector("#store > .row").innerHTML += productHtml;
    });

    const categories = await loadCategories();
    categories.forEach(category => {
        const categoryHtml =`<div class="input-checkbox">
                                <input type="checkbox" id="category-${category.id}" value="${category.name}" onclick="loadBooksByCategory(value)">
                                <label for="category-${category.id}">
                                    <span></span>
                                    ${category.name}
                                    <small>(${category.count})</small>
                                </label>
                            </div>`
        document.querySelector(".aside:first-child .checkbox-filter").innerHTML += categoryHtml;
    });

    const authors = await loadAuthors();
    authors.forEach(author => {
        const authorHtml =`<div class="input-checkbox">
                                <input type="checkbox" id="brand-${author.id}" value="${author.name}" onclick="loadBooksByAuthor(value)">
                                <label for="brand-${author.id}">
                                    <span></span>
                                    ${author.name}
                                    <small>(${author.count})</small>
                                </label>
                            </div>`
        document.querySelector(".aside:nth-of-type(2) .checkbox-filter").innerHTML += authorHtml;
    });
})
