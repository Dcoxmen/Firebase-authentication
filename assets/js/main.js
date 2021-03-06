// Initialize Firebase
$(document).ready(function() {
  var database = firebase.database();
  $("#addTrn-form").on("submit", function() {
    // take user input
    var trainName = $("#trainName")
      .val()
      .trim();
    var trainDest = $("#trainDest")
      .val()
      .trim();
    var trainStart = moment(
      $("#trainStart")
        .val()
        .trim(),
      "HH:mm"
    ).format("HH:mm");
    var trainFreq = $("#trainFreq")
      .val()
      .trim();

    // to create local temporary object to hold train data
    var newTrain = {
      name: trainName,
      place: trainDest,
      strain: trainStart,
      freq: trainFreq
    };
    // uploads train data to the database
    database.ref().push(newTrain);
    console.log(newTrain.name);
    // clears all the text-boxes
    $("#trainName").val("");
    $("#trainDest").val("");
    $("#trainStart").val("");
    $("#trainFreq").val("");
    // Prevents moving to new page
    return false;
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().place;
    var trainStart = childSnapshot.val().strain;
    var trainFreq = childSnapshot.val().freq;

    var firstConvert = moment(trainStart, "HH:mm");
    console.log(firstConvert);
    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + currentTime);

    var timeDifference = moment().diff(moment(firstConvert), "minutes");
    console.log(trainStart);
    var timeRemainder = timeDifference % trainFreq;
    console.log(timeRemainder);

    var minsTilTrain = trainFreq - timeRemainder;

    var nextTrn = moment()
      .add(minsTilTrain, "minutes")
      .format("HH:mm");

    $("#trainData>tbody").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        trainDest +
        "</td><td>" +
        nextTrn +
        "</td><td>" +
        trainFreq +
        "</td><td>" +
        minsTilTrain +
        "</tr></td>"
    );
  });
});
