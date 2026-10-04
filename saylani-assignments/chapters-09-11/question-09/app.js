// Chapters 9–11 — Question 9
// Check whether a number is even or odd

var number = askNumber('Enter an integer:', 8, undefined, undefined, true);
if (number % 2 === 0) { writeLine(number + ' is even.'); }
else { writeLine(number + ' is odd.'); }
