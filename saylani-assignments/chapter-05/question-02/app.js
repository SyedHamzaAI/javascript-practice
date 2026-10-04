// Chapters 5 — Question 2
// Subtract, multiply, divide and find the remainder

var firstNumber = askNumber('Enter the first number:', 10);
var secondNumber = askNumber('Enter the second number:', 3);
writeLine('Subtraction: ' + (firstNumber - secondNumber));
writeLine('Multiplication: ' + (firstNumber * secondNumber));
if (secondNumber === 0) {
    writeLine('Division and modulus require a nonzero divisor.');
} else {
    writeLine('Division: ' + (firstNumber / secondNumber));
    writeLine('Modulus: ' + (firstNumber % secondNumber));
}
