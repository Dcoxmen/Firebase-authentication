$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgUcIoo1YqvalGCRYgDpVqiPK-Hxldeu8",
    authDomain: "logintest-f64e6.firebaseapp.com",
    databaseURL: "https://logintest-f64e6.firebaseio.com",
    projectId: "logintest-f64e6",
    storageBucket: "",
    messagingSenderId: "1035191972409"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  //connect to firebase with variables
  const database = firebase.database();
  const auth = firebase.auth();

  //cache the DOM from html forms
  const loginForm = $("#login-form");
  const loginEmail = $("#login-email");
  const loginPassword = $("#login-password");
  const loginButton = $("#login-button");
  const signUpForm = $("#sign-up-form");
  const signUpEmail = $("#sign-up-email");
  const signUpPassword = $("#sign-up-password");
  const signUpButton = $("#sign-up-button");
  const logoutButton = $("#logout-button");
  const status = $("#status");
  const errors = $("#errors");

  //sign up form
  signUpForm.on("submit", e => {
    e.preventDefault();
    const email = signUpEmail.val();
    const pass = signUpPassword.val();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => displayError(e.message));
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      //logged in user properties
      console.log(firebaseUser);
      loginForm.hide();
      signUpForm.hide();
      logoutButton.show();
    } else {
      console.log("not logged in");
      loginForm.hide();
      signUpForm.show();
      logoutButton.hide();
    }
  });
});
