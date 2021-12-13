//Validating Log in form
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    checkLoginInputs();
})

function checkLoginInputs() {
    //get values from the inputs
    const loginUsernameValue = loginUsername.value.trim();
    const loginPasswordValue = loginPassword.value.trim();

    if(loginUsernameValue === '') {
        setLoginErrorFor(loginUsername, 'Username cannot be blank');
    } else {
        setLoginSuccessFor(loginUsername);
    }

    if(loginPasswordValue === '') {
        setLoginErrorFor(loginPassword, 'Password cannot be blank');
    } else {
        setLoginSuccessFor(loginPassword);
    }
}

function setLoginErrorFor(input, message) {
    const loginFormControl = input.parentElement;
    const loginSmall = loginFormControl.querySelector('small');

    //add error class
    loginFormControl.className = "form-control error";

    //add error message inside small
   loginSmall.innerText = message;
}

function setLoginSuccessFor(input) {
    const loginFormControl = input.parentElement;
    loginFormControl.className = "form-control success";
}