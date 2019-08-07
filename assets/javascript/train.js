var firebaseConfig = {
    apiKey: "AIzaSyBe5VJgmICc0yTxyqzLUux4XSjgwqKXdwk",
    authDomain: "train-schedule-9c363.firebaseapp.com",
    databaseURL: "https://train-schedule-9c363.firebaseio.com",
    projectId: "train-schedule-9c363",
    storageBucket: "",
    messagingSenderId: "913147081100",
    appId: "1:913147081100:web:0e38f27cc25fb61c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Var firebase data
var database = firebase.database();

//When the submit button is clicked, take snapshot
$("#click-button").on("click", function () {

    //Stops page from refreshing
    event.preventDefault();

    var currentTime = moment();
    var time = $("#time").val().trim().split(":");

    var trainTime = moment().hours(time[0]).minutes(time[1]).format("HH:mm");

    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years").format();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tFrequency = $("#frequency").val().trim();


    //Get user info
    var trainName = $("#name").val().trim();

    var trainDestination = $("#destination").val().trim();


    var newTrain = {
        train: trainName,
        destination: trainDestination,
        first: firstTimeConverted,
        frequency: tFrequency
    }
    console.log(newTrain);
    // setting the new values to the database
    database.ref().push(newTrain);

    // console logging to check new data has been stored

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var cs = childSnapshot.val();

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(cs.first), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % cs.frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = cs.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var tableRow = $("<tr>");
    var rowHead = $(`<th scope="row">${cs.train}</th>`);
    var rowDestination = $(`<td>${cs.destination}</td>`);
    var rowTime = $(`<td>${cs.first}</td>`);
    var rowFrequency = $(`<td>${cs.frequency}</td>`);
    var rowNext = $(`<td>${tMinutesTillTrain}</td>`);

    tableRow.append(rowHead);
    tableRow.append(rowDestination);
    tableRow.append(rowTime);
    tableRow.append(rowFrequency);
    tableRow.append(rowNext);

    $("#trainData").append(tableRow);


});