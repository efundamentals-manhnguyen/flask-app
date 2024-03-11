function setErrorStyle(field, name) {
    field.setAttribute("style", "border: 1px red solid");
    document.querySelector(`[name="${name}"] + .validation-message`).classList.remove("is-hidden");
    document.querySelector(`[name="${name}"] + .validation-message`).classList.add("is-display");
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

    const requestBody = {
        name: listFieldValues.find(v => v.name === "student-name").value
    }

    console.log(listFieldValues);
}