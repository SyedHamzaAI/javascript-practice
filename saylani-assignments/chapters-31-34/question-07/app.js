// Chapters 31–34 — Question 7
// Identify AM or PM

var hour = new Date().getHours();
var message = hour < 12 ? 'Its AM' : 'Its PM';
alert(message);
writeLine(message);
