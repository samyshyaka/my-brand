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

function logIn() {
  var email = document.getElementById("login-email");
  var password = document.getElementById("login-password");

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      //Declare user variable
      var user = firebase.auth().currentUser;

      //add user to the database

      var database_ref = db.ref();

      //Create user data

      var user_data = {
        last_login: Date.now(),
      };

      database_ref.child("users/" + user.uid).update(user_data);

      window.location = "blog-dashboard.html";

    })
    .catch((error) => {
      var error_code = error.code;
      var error_message = error.message;
      if (error_message == "The password is invalid or the user does not have a password.")
      setLoginErrorFor(loginPassword, "Wrong password");
      console.log(error_message);
    });

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     window.location = "blog-dashboard.html";
  //   }

  //   alert("User Logged In!");
  // });
}
