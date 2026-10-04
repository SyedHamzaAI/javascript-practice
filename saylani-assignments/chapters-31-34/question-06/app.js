// Chapters 31–34 — Question 6
// Calculate elapsed milliseconds and minutes since 1970

var currentDate = new Date();
// The assignment explicitly asks to assign a variable not declared beforehand.
// This classic script is deliberately not in strict mode for this exercise.
// In ordinary production code, declare minutesSinceEpoch with var/let/const.
minutesSinceEpoch = currentDate.getTime() / (1000 * 60);
writeLine('Current date: ' + currentDate.toString());
writeLine('Elapsed milliseconds since January 1, 1970: ' + currentDate.getTime());
writeLine('Elapsed minutes since January 1, 1970: ' + minutesSinceEpoch);
