let getAllBorrowedBooksApi = "http://127.0.0.1:5000/borrow-management/borrow/books"
let deleteBorrowedBookApi = "http://127.0.0.1:5000/borrow-management/borrow/"
let searchBorrowByStudentNameApi = "http://127.0.0.1:5000/borrow-management/borrow/"


document.addEventListener("DOMContentLoaded", async () => {
    let borrows = await fetch(getAllBorrowedBooksApi).then(res => res.json());
    borrows.Books.forEach((borrow, index)=> {
        const bookHtml =` <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${borrow[1]}</td>
                            <td>${borrow[2]}</td>
                            <td>${borrow[3]}</td>
                            <td>${borrow[4]}</td>
                            <td>${borrow[5]}</td>
                            <td>
                                <img src="./img/${borrow[6]}.webp" alt="" style="width: 70px; height: 70px;">
                            </td>
                            <td>${borrow[7]}</td>
                            <td>${borrow[8]}</td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="deleteBorrowedBook(${borrow[0]})">Delete</button>
                            </td>
                        </tr>`
        document.querySelector(".table tbody").innerHTML += bookHtml;
    });
})


function deleteBorrowedBook(borrowId){
    fetch(deleteBorrowedBookApi + borrowId,  {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function(response){
        if(response.status == 200){
            window.location = './borrowed_books_page.html'
            alert("Boroow deleted!")
        }
    })
    .catch(function(error){
        console.log(error)
    })
}

async function searchBorrowByStudentName(){
    let searchTerm = document.querySelector("[placeholder='Search here']").value;
    let borrows = await fetch(searchBorrowByStudentNameApi + searchTerm).then(response => response.json());
    console.log(borrows)
    if(borrows['message'] !== "Not found borrow!"){
        document.querySelector(".table tbody").innerHTML = "";
        borrows.Borrow.forEach((borrow, index) => {
            const bookHtml =` <tr>
                                <th scope="row">${index + 1}</th>
                                <td>${borrow[1]}</td>
                                <td>${borrow[2]}</td>
                                <td>${borrow[3]}</td>
                                <td>${borrow[4]}</td>
                                <td>${borrow[5]}</td>
                                <td>
                                    <img src="./img/${borrow[6]}.webp" alt="" style="width: 70px; height: 70px;">
                                </td>
                                <td>${borrow[7]}</td>
                                <td>${borrow[8]}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" onclick="deleteBorrowedBook(${borrow[0]})">Delete</button>
                                </td>
                            </tr>`
            document.querySelector(".table tbody").innerHTML += bookHtml;
        });
    } else {
        alert("Student name is not exist !!")
    }
}