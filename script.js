//Grab current time from moment.js
var dayTime = moment().format("dddd");
var dateTime = moment().format("MMMM Do");
var milTime = parseInt(moment().format("H"));

//Define work day array
var civHour = [9,10,11,12,1,2,3,4,5];
var milHour = [9,10,11,12,13,14,15,16,17];
var currentNote = ["","","","","","","","",""];

//Display today's date
var currentDayEl = $("#currentDay");
currentDayEl.text(dayTime + ", " + dateTime);

//If there's stored notes add them to current notes
var storedNotes = JSON.parse(localStorage.getItem("storedNotes"));
if (storedNotes){
    currentNote = storedNotes;
}

//Go through the work day hour by hour
for (i=0;i<milHour.length;i++){

    //Create hour div
    var rowDivEl = $("<div class='row'>");

    //Display hour name
    var pEl = $("<p class='col-1'>");
    if (milHour[i] < 12) {
        pEl.text(civHour[i] + "AM");
    } else if (milHour[i] >= 12) {
        pEl.text(civHour[i] + "PM");
    };
    rowDivEl.append(pEl);

    //Display hour notes
    var textAreaEl = $("<textarea type='text' class='col'>");
    textAreaEl.attr("data-note", i);
    rowDivEl.append(textAreaEl);
    textAreaEl.val(currentNote[i]);

    //Change color based on current time
    if (milHour[i] === milTime) {
        textAreaEl.attr("style","background: lemonchiffon;");
    } else if (milHour[i] < milTime) {
        textAreaEl.attr("style","background: lightcoral;");
    } else if(milHour[i] > milTime) {
        textAreaEl.attr("style","background: lightgreen;");
    };

    //Display save button
    var inputSubmitEl = $("<input type='submit' value='Save' class='save col-1'>");
    inputSubmitEl.append("<i class='fas fa-save'></i>");
    rowDivEl.append(inputSubmitEl);
    
    //Append hour elements into main view
    var mainEl = $(".container");
    mainEl.append(rowDivEl);

}

//Save hour notes when the save button is clicked
$(".save").click(function () {
    
    //Save current note into it's selected hour
    var currentNoteId = $(this).prev().attr("data-note");
    currentNote[currentNoteId] = $(this).prev().val();

    //Store notes into local storage
    localStorage.setItem("storedNotes",JSON.stringify(currentNote));

});