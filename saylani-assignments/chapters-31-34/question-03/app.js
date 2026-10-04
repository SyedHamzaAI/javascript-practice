// Chapters 31–34 — Question 3
// Alert the first three letters of the current day

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var day = days[new Date().getDay()].slice(0, 3);
alert('Today is ' + day);
writeLine('Today is ' + day);
