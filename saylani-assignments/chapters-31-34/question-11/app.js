// Chapters 31–34 — Question 11
// Move a date object one hour ahead

var currentDate = new Date();
var originalDate = new Date(currentDate.getTime());
var currentHours = currentDate.getHours();
currentDate.setHours(currentHours + 1);
writeLine('Current date: ' + originalDate.toString());
writeLine('One hour ahead: ' + currentDate.toString());
