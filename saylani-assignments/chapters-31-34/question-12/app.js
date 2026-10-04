// Chapters 31–34 — Question 12
// Reset a date object one hundred years back

var date = new Date();
var originalDate = new Date(date.getTime());
date.setFullYear(date.getFullYear() - 100);
alert('100 years back: ' + date.toString());
writeLine('Current date: ' + originalDate.toString());
writeLine('100 years back: ' + date.toString());
