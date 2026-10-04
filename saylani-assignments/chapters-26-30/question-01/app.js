// Chapters 26–30 — Question 1
// Round, floor and ceil a positive number

var number = askNumber('Enter a positive number:', 3.45214, Number.MIN_VALUE);
writeLine('Number: ' + number);
writeLine('Round off value: ' + Math.round(number));
writeLine('Floor value: ' + Math.floor(number));
writeLine('Ceil value: ' + Math.ceil(number));
