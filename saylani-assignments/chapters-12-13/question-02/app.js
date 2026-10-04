// Chapters 12–13 — Question 2
// Compare two integers

var first = askNumber('Enter the first integer:', 10, undefined, undefined, true);
var second = askNumber('Enter the second integer:', 20, undefined, undefined, true);
if (first > second) { writeLine(first + ' is larger.'); }
else if (second > first) { writeLine(second + ' is larger.'); }
else { writeLine('Both integers are equal.'); }
