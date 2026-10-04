// Chapters 35–38 — Question 5
// Square a function argument

function square(number) { return number * number; }
var number = askNumber('Enter a number to square:', 5);
writeLine('Square: ' + square(number));
