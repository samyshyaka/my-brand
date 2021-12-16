console.log("initialize database");

const firebaseConfig = {
    apiKey: "AIzaSyCyOmGU3erQrKzXSSlnprdHC9yC9VjuAYU",
    authDomain: "my-brand-91094.firebaseapp.com",
    projectId: "my-brand-91094",
    storageBucket: "my-brand-91094.appspot.com",
    messagingSenderId: "1015021830320",
    appId: "1:1015021830320:web:05640249ae5a6211c23b75"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();