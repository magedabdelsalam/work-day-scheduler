var dayTime = moment().format("dddd");
var dateTime = moment().format("MMMM Do");
var civilianTime = moment().format("h");
var militaryTime = moment().format("H");

var civHour = [9,10,11,12,1,2,3,4,5];
var milHour = [9,10,11,12,13,14,15,16,17];
var hourNote = ["","","","","","","","",""];

var mainEl = $(".container");
var currentDayEl = $("#currentDay");
var dayInputTextEl = $("input");

currentDayEl.text(dayTime + ", " + dateTime);

var savedNotes = JSON.parse(localStorage.getItem("notes"));
hourNote = savedNotes;

for (i=0;i<milHour.length;i++){
    // Hour
    var rowDivEl = $("<div class='row'>");

    // Hour title
    var pEl = $("<p class='col-1'>");
    if (milHour[i] < 12) {
        pEl.text(civHour[i] + "AM");
    } else if (milHour[i] >= 12) {
        pEl.text(civHour[i] + "PM");
    };
    rowDivEl.append(pEl);

    // Hour notes
    var inputTextEl = $("<input type='text' class='col'>");
    inputTextEl.attr("data-note", i);
    rowDivEl.append(inputTextEl);

    if (milHour[i] === militaryTime) {
        inputTextEl.attr("style","background: yellow;");
    } else if (milHour[i] < militaryTime) {
        inputTextEl.attr("style","background: red;");
    } else if(milHour[i] > militaryTime) {
        inputTextEl.attr("style","background: green;");
    };

    inputTextEl.val(hourNote[i]);

    // Hour notes save
    var inputSubmitEl = $("<input type='submit' value='Save' class='save col-1'>");
    inputSubmitEl.append("<i class='fas fa-save'></i>");
    rowDivEl.append(inputSubmitEl);
    
    mainEl.append(rowDivEl);
}

$(".save").click(function () {
    var noteData = $(this).prev().attr("data-note")
    console.log($(this).prev().attr("data-note"))
    
    hourNote[noteData] = $(this).prev().val();
    console.log(hourNote[noteData])

    localStorage.setItem("notes",JSON.stringify(hourNote));
});