// Chapters 9–11 — Question 11
// Create a calculator using if statements

var first = askNumber('Enter the first number:', 10);
var second = askNumber('Enter the second number:', 5);
var operation = askText('Enter an operator (+, -, *, /, %):', '+');
var result;
if ((operation === '/' || operation === '%') && second === 0) {
    writeLine('Cannot divide or take a remainder by zero.');
} else {
    if (operation === '+') { result = first + second; }
    else if (operation === '-') { result = first - second; }
    else if (operation === '*') { result = first * second; }
    else if (operation === '/') { result = first / second; }
    else if (operation === '%') { result = first % second; }
    else { writeLine('Invalid operator. Choose +, -, *, / or %.'); }
    if (result !== undefined) { writeLine(first + ' ' + operation + ' ' + second + ' = ' + result); }
}
