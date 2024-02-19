let addBookApi = "http://127.0.0.1:5000/book-management/book"
let getAuthorApi = "http://127.0.0.1:5000/author-management/authors"
let getCategoryApi = "http://127.0.0.1:5000/category-management/categories"

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

async function handleAddBookForm(){
    let name = document.querySelector("input[name='name']").value
    let image_url = document.querySelector("input[name='image-url']").value
    let description = document.querySelector("input[name='description']").value
    let author_name = document.querySelector("input[name='author-name']").value
    let category_name = document.querySelector("input[name='category-name']").value

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

    if(name && image_url  && description && author_id && category_id )
    {
        let data = {
            name: name,
            image_url: image_url,
            description: description,
            author_id: author_id,
            category_id: category_id
        }
        addBook(data)
    }else{
        alert("Please fullfill all fields in the form!!!!")
    }
}

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