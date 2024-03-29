let registerApi = "http://127.0.0.1:5000/student-management/student"

async function register(data){
    await fetch(registerApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function(response){
            if(response.status == 200){
                alert("Register success!")
                window.location = './login_page.html'
            }else{
                alert("Register failed!")
            }
        })
        .catch(function(error){
            console.error(error)
        })
}

function setErrorStyle(field, name) {
    field.setAttribute("style", "border: 1px red solid");
    document.querySelector(`[name="${name}"] + .validation-message`).classList.remove("is-hidden");
    document.querySelector(`[name="${name}"] + .validation-message`).classList.add("is-display");
    document.getElementById("register-button").setAttribute("disabled", true);
}

function setNullInputError(field, name){
    field.setAttribute("style", "border: 1px red solid");
    document.querySelector(`[name="${name}"] ~ .null-input-error-message`).classList.remove("is-hidden");
    document.querySelector(`[name="${name}"] ~ .null-input-error-message`).classList.add("is-display");
    document.getElementById("register-button").setAttribute("disabled", true);
}

function removeErrorStyle(field, name) {
    field.removeAttribute("style");
    document.querySelector(`[name="${name}"] + .validation-message`).classList.remove("is-display");
    document.querySelector(`[name="${name}"] + .validation-message`).classList.add("is-hidden");
    document.querySelector(`input[name="${name}"] ~ .null-input-error-message`).classList.add("is-hidden");
    document.getElementById("register-button").removeAttribute("disabled", false);
}

function field_validation(e, isRePw = false) {
    const field = e.target;
    const value = e.target.value;
    const regex = e.target.getAttribute("regex");
    const reg = new RegExp(regex);
    const name = field.getAttribute("name");
    if (!reg.test(value)) {
        setErrorStyle(field, name);
    } else {
        removeErrorStyle(field, name);
    }

    if (isRePw) {
        const password = document.querySelector('[name="password"]').value;
        if (value !== password) {
            setErrorStyle(field, name);
        } else {
            removeErrorStyle(field, name);
        }
    }
}

function handleRegister(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const listRawFieldValues = [...data.entries()];
    const listFieldValues = listRawFieldValues.map(value => {
        return {
            name: value[0],
            value: value[1]
        }
    });
    console.log(listFieldValues)

    let name = listFieldValues.find(v => v.name === "student-name").value;
    let email = listFieldValues.find(v => v.name === "email").value;
    let password = listFieldValues.find(v => v.name === "password").value;
    let confirm_password = listFieldValues.find(v => v.name === "confirm-password").value;
    let dob = listFieldValues.find(v => v.name === "dob").value;
    let class_name = listFieldValues.find(v => v.name === "class-name").value;

    if (name && email && password && confirm_password && dob && class_name){
        const requestBody = {
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
            dob: dob,
            gender: listFieldValues.find(v => v.name === "inlineRadioOptions").value,
            class_name: class_name
        }
    
        register(requestBody)
    } else {
        for(let i = 0; i <= listFieldValues.length; i++){
            if(listFieldValues[i]["value"].length < 1){
                setNullInputError(document.querySelector(`input[name="${listFieldValues[i]["name"]}"]`), listFieldValues[i]["name"])
            }
        }
    }
}