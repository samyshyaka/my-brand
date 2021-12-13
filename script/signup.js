//Validating Sign up form
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const pswdInfo = document.querySelector('.pswd-info')
const pswdLength = document.getElementById('length');
const pswdLetter = document.getElementById('letter');
const pswdCapital = document.getElementById('capital');
const pswdNumber = document.getElementById('number');
const pswdSpecialChar = document.getElementById('special-char')
const lengthValidationIcon = document.querySelector('#length i');
const letterValidationIcon = document.querySelector('#letter i');
const capitalValidationIcon = document.querySelector('#capital i');
const numberValidationIcon = document.querySelector('#number i');
const specialCharValidationIcon = document.querySelector('#special-char i');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
})

function checkInputs() {
    //get values from the inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
    } else {
        setSuccessFor(email);
    }

    if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }

    if(password2Value === '') {
        setErrorFor(password2, 'Password cannot be blank');
    } else if(password2Value != passwordValue){
        setErrorFor(password2, 'Passwords do not match')
    }    
    else {
        setSuccessFor(password2);
    }
    
}

password.addEventListener('input', (e) => {

    const passwordValue = password.value.trim();

    if(passwordValue != '') {
        document.getElementById('pswd-validation').className = "pswd-info visible";
    } else {
        document.getElementById('pswd-validation').className = "pswd-info hidden";
    }
    
    if(passwordValue.length >= 8){
        pswdLength.className = "valid";
        lengthValidationIcon.className = "fa fa-check"
    } else {
        pswdLength.className = "invalid";
        lengthValidationIcon.className = "fa fa-times"
    }

    if(passwordValue.match(/[a-z]/)){
        pswdLetter.className = "valid";
        letterValidationIcon.className = "fa fa-check"
    } else {
        pswdLetter.className = "invalid";
        letterValidationIcon.className = "fa fa-times"
    }

    if(passwordValue.match(/[A-Z]/)){
        pswdCapital.className = "valid";
        capitalValidationIcon.className = "fa fa-check"
    } else {
        pswdCapital.className = "invalid";
        capitalValidationIcon.className = "fa fa-times"
    }

    if(passwordValue.match(/\d/)){
        pswdNumber.className = "valid";
        numberValidationIcon.className = "fa fa-check"
    } else {
        pswdNumber.className = "invalid";
        numberValidationIcon.className = "fa fa-times"
    }

    if(passwordValue.match(/[!@#$%&]/)){
        pswdSpecialChar.className = "valid";
        specialCharValidationIcon.className = "fa fa-check";
    } else {
        pswdSpecialChar.className = "invalid";
        specialCharValidationIcon.className = "fa fa-times";
    }
})


function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    //add error class
    formControl.className = "form-control error";

    //add error message inside small
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function isEmail(emailAddress) {

    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(emailAddress);
}
