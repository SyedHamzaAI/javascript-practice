// Chapters 35–38 — Question 6
// Calculate a factorial

function factorial(number) {
    var result = 1;
    for (var i = 2; i <= number; i++) { result *= i; }
    return result;
}
var number = askNumber('Enter a whole number from 0 to 170:', 5, 0, 170, true);
writeLine(number + '! = ' + factorial(number));
