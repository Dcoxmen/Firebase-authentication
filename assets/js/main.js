var mainApp = {};
(function() {
  var firebase = app_fireBase;
  var uid = null;
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Signed Out");
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );

  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in.
  //     uid = user.uid;
  //   } else {
  //     uid = null;
  //     window.location.replace("login.html");
  //   }
  // });
  function logOut() {
    firebase.auth.signOut();
  }
  mainApp.logOut = logOut;
});
