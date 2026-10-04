// Chapters 31–34 — Question 9
// Count days since the assigned Ramadan date

var ramadanStart = new Date(2015, 5, 18);
var currentDate = new Date();
var daysPassed = Math.floor((currentDate.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24));
var message = daysPassed + ' days have passed since 1st Ramadan, 2015';
alert(message);
writeLine(message);
