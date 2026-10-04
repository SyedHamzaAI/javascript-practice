// Chapters 9–11 — Question 8
// Check whether a number is divisible by three

var number = askNumber('Enter an integer:', 9, undefined, undefined, true);
if (number % 3 === 0) { writeLine(number + ' is divisible by 3.'); }
else { writeLine(number + ' is not divisible by 3.'); }
