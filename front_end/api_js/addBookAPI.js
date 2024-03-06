let addBookApi = "http://127.0.0.1:5000/book-management/book"
let getAuthorApi = "http://127.0.0.1:5000/author-management/authors"
let getCategoryApi = "http://127.0.0.1:5000/category-management/categories"
let addAuthor = "http://127.0.0.1:5000/author-management/author"
let addCate = "http://127.0.0.1:5000/category-management/category"
let uploadedImage;
let xUserName = localStorage.getItem("x-user-name");

window.onload = function() {
    if(xUserName){
        document.querySelector(".header-links a span").innerHTML = xUserName
    }
}

async function loadAuthors(){
    let listAuthors = await fetch(getAuthorApi).then(res => res.json());
    return listAuthors;
}

async function loadCategories(){
    let listCategories = await fetch(getCategoryApi).then(res => res.json());
    return listCategories;
}

function addBook(data){
    fetch(addBookApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function(response){
            if(response.status == 200){
                window.location = './index.html'
                alert("Book added!")
            }
        })
        .catch(function(error){
            console.log(error)
        })
}

// check if author name already exists
async function doesAuthorExist(author_name){
    let x = 0
    let author_list = document.querySelectorAll("#authors option")
    author_list.forEach(name => {
        if(author_name == name.getAttribute("value")){
            x += 1 
        }
    })
    if(x == 0){
        await fetch(addAuthor, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": author_name})
        })
        .then(function(response){
            if(response.status == 200){
                console.log("Author added!")
            }
        })
        .catch(function(error){
            console.log(error)
        })
    } 
}

// check if category name already exists
async function doesCateExist(category_name){
    let y = 0
    let cate_list = document.querySelectorAll("#categories option")
    cate_list.forEach(name => {
        if(category_name == name.getAttribute("value")){
            y += 1 
        }
    })
    if(y == 0){
        await fetch(addCate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": category_name})
        })
        .then(function(response){
            if(response.status == 200){
                console.log("Cate added!")
            }
        })
        .catch(function(error){
            console.log(error)
        })
    }
}

async function handleAddBookForm(){
    let name = document.querySelector("input[name='name']").value
    let image_url
    let description = document.querySelector("input[name='description']").value
    let author_name = document.querySelector("input[name='author-name']").value
    let category_name = document.querySelector("input[name='category-name']").value
    console.log(author_name + "----" +  category_name)

    // check if author and category name already exist
    await doesAuthorExist(author_name)
    await doesCateExist(category_name)

    //get author_id and cate_id from data by comparing author and cate name
    let author_id
    let category_id
    let authors = await loadAuthors();
    authors.forEach(author => {
        if(author['name'] == author_name){
            author_id = author['id']
        }
    });

    let categories = await loadCategories();
    categories.forEach(category => {
        if(category['name'] == category_name){
            category_id = category['id']
        }
    });

    // check if book image is loaded
    const file = document.getElementById("uploaded-file").files[0];
    if(file){
        image_url = file.name;
    }

    // validate data
    if(name && image_url  && description && author_id && category_id )
    {
        let data = {
            name: name,
            image_url: image_url,
            description: description,
            author_id: author_id,
            category_id: category_id
        }
        // add book image to img file
        await fetch(`http://127.0.0.1:5000/book-management/book/upload/${image_url}`, {
            method: "POST",
            body: file
        });
        //add book
        addBook(data)
    }else{
        alert("Please fullfill all fields in the form!!!!")
    }
}

// load image on the page img tag
window.addEventListener('load', function() {
    document.querySelector('#uploaded-file').addEventListener('change', function() {
        let img = document.querySelector('#uploaded-file + img');
        img.style.display = ""
        img.onload = () => {
            URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }
  
        img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    let authors = await loadAuthors();
    authors.forEach(author => {
        const authorHtml =`<option value="${author['name']}">`
        document.querySelector("#authors").innerHTML += authorHtml;
    });

    let categories = await loadCategories();
    categories.forEach(category => {
        const categoryHtml =`<option value="${category['name']}">`
        document.querySelector("#categories").innerHTML += categoryHtml;
    });
})