// Chapters 31–34 — Question 2
// Alert the current month in words

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var currentDate = new Date();
var month = months[currentDate.getMonth()];
alert('Current month: ' + month);
writeLine('Current month: ' + month);
