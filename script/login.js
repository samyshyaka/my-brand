//Validating Log in form
const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  checkLoginInputs();
});

function checkLoginInputs() {
  //get values from the inputs
  const loginUsernameValue = loginUsername.value.trim();
  const loginPasswordValue = loginPassword.value.trim();

  if (loginUsernameValue === "") {
    setLoginErrorFor(loginUsername, "Username cannot be blank");
  } else {
    setLoginSuccessFor(loginUsername);
  }

  if (loginPasswordValue === "") {
    setLoginErrorFor(loginPassword, "Password cannot be blank");
  } else {
    setLoginSuccessFor(loginPassword);
  }
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
      var user = auth.currentUser;

      //add user to the database

      var database_ref = db.ref();

      //Create user data

      var user_data = {
        last_login: Date.now(),
      };

      database_ref.child("users/" + user.uid).update(user_data);
    })
    .catch((error) => {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location = "blog-dashboard.html";
    }

    alert("User Logged In!");
  });
}
