let addBookApi = "http://127.0.0.1:5000/book-management/book"

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

function handleAddBookForm(){
    let name = document.querySelector("input[name='name']").value
    let image_url = document.querySelector("input[name='image-url']").value
    let description = document.querySelector("input[name='description']").value
    let author_id = document.querySelector("input[name='author-id']").value
    let category_id = document.querySelector("input[name='category-id']").value

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