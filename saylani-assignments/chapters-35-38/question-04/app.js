// Chapters 35–38 — Question 4
// Create a three-argument calculator function

function calculate(num1, num2, operator) {
    if ((operator === '/' || operator === '%') && num2 === 0) {
        return 'Cannot divide or take a remainder by zero.';
    }
    if (operator === '+') { return num1 + num2; }
    if (operator === '-') { return num1 - num2; }
    if (operator === '*') { return num1 * num2; }
    if (operator === '/') { return num1 / num2; }
    if (operator === '%') { return num1 % num2; }
    return 'Invalid operator.';
}
var first = askNumber('Enter the first number:', 12);
var second = askNumber('Enter the second number:', 4);
var operator = askText('Enter an operator (+, -, *, /, %):', '/');
writeLine('Result: ' + calculate(first, second, operator));
