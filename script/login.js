//Validating Log in form
const loginForm = document.getElementById("login-form");
const email = document.getElementById('login-email');
const loginPassword = document.getElementById("login-password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkLoginInputs();
  logIn();
});

function checkLoginInputs() {
  //get values from the inputs
  const emailValue = email.value.trim();
  const loginPasswordValue = loginPassword.value.trim();

  if(emailValue === '') {
    setLoginErrorFor(email, 'Email cannot be blank');
  } else if(!isEmail(emailValue)){
  setLoginErrorFor(email, 'Email is not valid');
  } else {
  setLoginSuccessFor(email);
  }

  if (loginPasswordValue === "") {
    setLoginErrorFor(loginPassword, "Password cannot be blank");
  } else {
    setLoginSuccessFor(loginPassword);
  }
}

function isEmail(emailAddress) {

  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(emailAddress);
}

function setLoginErrorFor(input, message) {
  const loginFormControl = input.parentElement;
  const loginSmall = loginFormControl.querySelector("small");

  //add error class
  loginFormControl.className = "form-control error";

  //add error message inside small
  loginSmall.innerText = message;
}

function setLoginSuccessFor(input) {
  const loginFormControl = input.parentElement;
  loginFormControl.className = "form-control success";
}

function logIn() {fetch('https://shyaka-portfolio.herokuapp.com/api/v1/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email.value,
        password: loginPassword.value
    })
})
    .then(res => res.json())
    .then(data => {
      if (data.code == 200){
        localStorage.setItem('token', data.accessToken)
        window.location = "blog-dashboard.html";
      } 
      toastr.success("Successfully loggedin", "Success!")
      console.log(data)     
    })
}

