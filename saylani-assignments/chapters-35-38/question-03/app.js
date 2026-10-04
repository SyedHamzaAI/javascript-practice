// Chapters 35–38 — Question 3
// Return the sum of two user-entered numbers

function addNumbers(first, second) {
    return first + second;
}
var first = askNumber('Enter the first number:', 10);
var second = askNumber('Enter the second number:', 20);
writeLine('Sum: ' + addNumbers(first, second));
