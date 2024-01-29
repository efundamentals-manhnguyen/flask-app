let getBookByIdApi = "http://127.0.0.1:5000/book-management/book/"


const currentUrl = window.location.href
const regex = /book_id=(?<bookId>\d+)/;
const match = regex.exec(currentUrl);
let bookId = match.groups.bookId

document.addEventListener("DOMContentLoaded", async () => {
    let book = await fetch(getBookByIdApi + bookId).then(res => res.json());
    console.log(book)
    const bookHtml =`<div class="row">
                <!-- Product main img -->
                <div class="col-md-5 col-md-push-2">
                    <div id="product-main-img">
                        <div class="product-preview">
                            <img src="./img/${book.Books[0][1]}.webp" alt="">
                        </div>
                    </div>
                </div>
                <!-- /Product main img -->

                <!-- Product thumb imgs -->
                <div class="col-md-2  col-md-pull-5">
                    <div id="product-imgs">
                        <div class="product-preview">
                            <img src="./img/${book.Books[0][1]}.webp" alt="">
                        </div>

                        <div class="product-preview">
                            <img src="./img/${book.Books[0][1]}.webp" alt="">
                        </div>

                        <div class="product-preview">
                            <img src="./img/${book.Books[0][1]}.webp" alt="">
                        </div>
                    </div>
                </div>
                <!-- /Product thumb imgs -->

                <!-- Product details -->
                <div class="col-md-5">
                    <div class="product-details">
                        <h2 class="product-name">${book.Books[0][0]}</h2>
                        <p>Author: ${book.Books[0][4]}</p>
                        <p>Category: ${book.Books[0][3]}</p>
                        </br></br></br></br></br></br></br></br></br></br>
                        <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>Borrow</button>
                        </div>
                    </div>
                </div>
                <!-- /Product details -->

                <!-- Product tab -->
                <div class="col-md-12">
                    <div id="product-tab">
                        <!-- product tab nav -->
                        <ul class="tab-nav">
                            <li class="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                        </ul>
                        <!-- /product tab nav -->
                        <!-- product tab content -->
                        <div class="tab-content">
                            <!-- tab1  -->
                            <div id="tab1" class="tab-pane fade in active">
                                <div class="row">
                                    <div class="col-md-12">
                                        <p>${book.Books[0][2]}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- /tab1  -->
                        </div>
                        <!-- /product tab content  -->
                    </div>
                </div>
                <!-- /product tab -->
            </div>`
    document.querySelector("#navigation + .section .container").innerHTML += bookHtml;
})