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

function getGenderValue() {
    let genderValue
    let ele = document.getElementsByName('inlineRadioOptions');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            genderValue = ele[i].value
    }
    return genderValue
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

    for(let i = 0; i <= listFieldValues.length; i++){
        if(listFieldValues[i]["value"] === ""){
            setNullInputError(document.querySelector(`input[name="${listFieldValues[i]["name"]}"]`), listFieldValues[i]["name"])
        }
        if(listFieldValues[i]["value"] === ""){
            setNullInputError(document.querySelector(`input[name="${listFieldValues[i]["name"]}"]`), listFieldValues[i]["name"])
        }
    }

    const requestBody = {
        name: listFieldValues.find(v => v.name === "student-name").value,
        email: listFieldValues.find(v => v.name === "email").value,
        password: listFieldValues.find(v => v.name === "password").value,
        confirm_password: listFieldValues.find(v => v.name === "confirm-password").value,
        dob: listFieldValues.find(v => v.name === "dob").value,
        gender: listFieldValues.find(v => v.name === "inlineRadioOptions").value,
        class_name: listFieldValues.find(v => v.name === "class-name").value
    }

    register(requestBody)
}