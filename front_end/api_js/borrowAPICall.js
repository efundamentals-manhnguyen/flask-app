let getBookByIdApi = "http://127.0.0.1:5000/book-management/book/"
let addBorrowBookApi = "http://127.0.0.1:5000/borrow-management/borrow"


const currentUrl = window.location.href
const regex = /book_id=(?<bookId>\d+)/;
const match = regex.exec(currentUrl);
let bookId = match.groups.bookId;
let xAccessToken = localStorage.getItem("x-access-token");
let xUserName = localStorage.getItem("x-user-name");

window.onload = function() {
    if(xUserName){
        document.querySelector(".header-links a span").innerHTML = xUserName
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    let book = await fetch(getBookByIdApi + bookId).then(res => res.json());
    const bookHtml =`<div class="section-title text-center">
                    <h5 class="title">Borrow Book</h5>
                    </div>
                    <div class="order-summary">
                        <div class="order-products">
                            <div class="order-col">
                                <div>Book Name:</div>
                                <div>${book.Books[0][0]}</div>
                            </div>
                            <div class="order-col">
                                <div>Category: </div>
                                <div>${book.Books[0][3]}</div>
                            </div>
                            <div class="order-col">
                                <div>Author:</div>
                                <div>${book.Books[0][4]}</div>
                            </div>
                            <div class="order-col">
                                <div>Book ID:</div>
                                <div>${bookId}</div>
                            </div>
                            <div class="order-col">
                                <div>Book Image:</div>
                                <div>
                                    <img src="./img/${book.Books[0][1]}" alt="" style="height: 200px; width: 200px;">
                                </div>
                            </div>
                        </div>
                    </div>`
    document.querySelector(".order-details").innerHTML += bookHtml;
    document.querySelector("input[name='book-id']").value = book.Books[0][0];
})


function addBorrowBook(data){
    fetch(addBorrowBookApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': xAccessToken
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        if(response.status == 200){
            window.location = './borrowed_books_page.html'
            alert("Boroww is  done!")
        }
    })
    .catch(function(error){
        console.log(error)
    })
}

function handleBorrowForm(){
    let studentId = document.querySelector("input[name='student-id']").value
    let borrowDate = document.querySelector("input[name='borrow-date']").value
    let returnDate = document.querySelector("input[name='return-date']").value

    if(bookId && studentId && borrowDate && returnDate)
    {
        let data = {
            book_id: bookId,
            student_id: studentId,
            borrow_date: borrowDate,
            return_date: returnDate
        }
        addBorrowBook(data)
    }else{
        alert("Please fullfill all fields in the form!!!!")
    }
}