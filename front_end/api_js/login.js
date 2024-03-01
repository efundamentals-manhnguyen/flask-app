let loginApi = "http://127.0.0.1:5000/student-management/student/login"

function login(data){
    fetch(loginApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function(response){
            if(response.status == 200){
                window.location = './index.html'
                alert("Login success!")
            }else{
                alert("Login failed!")
            }
        })
        .catch(function(error){
            console.log(error)
        })
}

function handleLogin(){
    let email = document.querySelector("input[name='email']").value
    let password = document.querySelector("input[name='password']").value
    // validate data
    if(email && password)
    {
        let data = {
            email: email,
            password: password,
        }
        console.log(data)
        //log in
        login(data)
    }else{
        alert("Please fullfill all fields in the form!!!!")
    }
}