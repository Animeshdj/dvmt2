const form = document.querySelector(".form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const pnumber = document.querySelector("#phone-number");
const bitsid = document.querySelector("#bits-id");

form.addEventListener('submit', e => {
    e.preventDefault();

    validate();

    const formData = new FormData(form);

    fetch('http://www.foo.com/', {
        method: 'post',
        body: formData
    }).then((response) => response.json())
    .then((json) => console.log(json));
})

const error = (element, message) => {
    const container = element.parentElement;
    const errorDisplay = container.querySelector('.error-div');

    errorDisplay.innerText = message;
    container.classList.add('error')
    container.classList.remove('success')
}

const success = element => {
    const container = element.parentElement;
    const errorDisplay = container.querySelector('.error-div');

    errorDisplay.innerText = '';
    container.classList.add('success')
    container.classList.remove('error')
}

const validNumber = e => {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return !(regex.test(String(e)))
}

const validEmail = e => {
    const regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return !(regex.test(String(e)))
}
const validBitsID = e => {
    const regex = /^[0-9]{4}[a-bA-B]([a-bA-B]|[0-7])[a-zA-Z]{2}[0-9]{4}[a-zA-Z]/;
    return !(regex.test(String(e)))
}

const validate = () => {
    if(username.value === ''){
        error(username, 'Name is required');
    } else if ((username.value.length < 5) || (username.value.length > 50)){
        error(username,'Name must be 5-50 Letters')
    } else {
        success(username);
        console.log(username.value);
    }

    if(email.value === ''){
        error(email, 'Email is required');
    } else if (validEmail(email.value)) {
        error(email, 'Email is invalid');
    } else {
        success(email);
        console.log(email.value);
    }

    if(pnumber.value === ''){
        error(pnumber, 'Phone number is required');
    } else if(validNumber(pnumber.value)){
        error(pnumber, 'Phone number is invalid');
    } else {
        success(pnumber);
        console.log(pnumber.value);
    }

    if(bitsid.value === ''){
        error(bitsid, 'Bits ID is required');
    } else if(validBitsID(bitsid.value)) {
        error(bitsid, 'Bits ID is invalid');
    } else {
        success(bitsid);
        console.log(bitsid.value);
    }
}