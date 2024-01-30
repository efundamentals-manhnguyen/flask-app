let getBookByIdApi = "http://127.0.0.1:5000/book-management/book/"


const currentUrl = window.location.href
const regex = /book_id=(?<bookId>\d+)/;
const match = regex.exec(currentUrl);
let bookId = match.groups.bookId

document.addEventListener("DOMContentLoaded", async () => {
    let book = await fetch(getBookByIdApi + bookId).then(res => res.json());
    const bookHtml =`<div class="section-title text-center">
                    <h5 class="title">Borrow Book</h5>
                    </div>
                    <div class="order-summary">
                        <div class="order-products">
                            <div class="order-col">
                                <div>Book Name: </div>
                                <div>${book.Books[0][0]}</div>
                            </div>
                            <div class="order-col">
                                <div>Category: </div>
                                <div>${book.Books[0][3]}</div>
                            </div>
                            <div class="order-col">
                                <div>Author: </div>
                                <div>${book.Books[0][4]}</div>
                            </div>
                            <div class="order-col">
                                <div>Book Image: </div>
                                <div>
                                    <img src="./img/${book.Books[0][1]}.webp" alt="" style="height: 200px; width: 200px;">
                                </div>
                            </div>
                        </div>
                    </div>`
    document.querySelector(".order-details").innerHTML += bookHtml;
})