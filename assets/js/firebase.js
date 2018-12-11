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
  const addItemArea = $("#app-area");

  $("#hideit").click(function() {
    $("#sign-up-form").hide();
    $("#login-form").show();
  });
  $("#showit").click(function() {
    $("#login-form").hide();
    $("#sign-up-form").show();
  });

  //login form
  loginForm.on("submit", e => {
    e.preventDefault();
    const email = loginEmail.val();
    const pass = loginPassword.val();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => displayError(e.message));
  });

  //sign up form
  signUpForm.on("submit", e => {
    e.preventDefault();
    const email = signUpEmail.val();
    const pass = signUpPassword.val();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => displayError(e.message));
  });

  logoutButton.on("click", () => {
    auth.signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      //logged in user properties
      console.log(firebaseUser);
      addItemArea.show();
      loginForm.hide();
      signUpForm.hide();
      logoutButton.show();
      status.html('Status: <span class="status-green">logged in</span>');
    } else {
      console.log("not logged in");
      addItemArea.hide();
      loginForm.hide();
      signUpForm.show();
      logoutButton.hide();
      status.html('Status: <span class="status-red">not logged in</span>');
    }
  });

  //error handling
  var displayError = message => {
    console.log("this happened");
    errors.text(message);
    setTimeout(() => {
      errors.empty();
    }, 4000);
  };
});
