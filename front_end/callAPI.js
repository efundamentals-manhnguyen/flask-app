let getBookApi = "http://127.0.0.1:5000/book-management/books"
let getCategoryApi = "http://127.0.0.1:5000/category-management/categories"
let getAuthorApi = "http://127.0.0.1:5000/author-management/authors"
let getBookByAuthor = "/book-management/book/"



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
        console.log(books)
        let html = books.Books.map(function(book){
            return `<div class="col-md-4 col-xs-6">
						<div class="product">
							<div class="product-img">
								<img src="./img/${book[1]}.webp" alt="">
							</div>
							<div class="product-body">
								<p class="product-category">${book[2]}</p>
								<h3 class="product-name"><a href="#">${book[0]}</a></h3>
								<h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
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
										<button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick
										view</span></button>
										</div>
										</div>
										<div class="add-to-cart">
										<button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>Borrow</button>
								</div>
							</div>
						</div>`
        })
        const bookHtmlBlocks = document.querySelectorAll("#store > .row > div");
        bookHtmlBlocks.forEach(block => {
            block.remove();
        })
        document.querySelector("#store > .row").innerHTML += html;
    })
   
}
