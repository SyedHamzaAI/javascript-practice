// Chapters 26–30 — Question 2
// Round, floor and ceil a negative floating-point number

var number = askNumber('Enter a negative floating-point number:', -2.673, undefined, -Number.MIN_VALUE);
writeLine('Number: ' + number);
writeLine('Round off value: ' + Math.round(number));
writeLine('Floor value: ' + Math.floor(number));
writeLine('Ceil value: ' + Math.ceil(number));
