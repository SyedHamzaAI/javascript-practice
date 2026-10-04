// Chapters 38–42 — Question 1
// Write a custom power function

function power(a, b) {
    if (a === 0 && b < 0) { return 'Zero cannot be raised to a negative power.'; }
    var result = 1;
    var i = 0;
    while (i < Math.abs(b)) {
        result *= a;
        i++;
    }
    return b < 0 ? 1 / result : result;
}
var base = askNumber('Enter the base:', 2);
var exponent = askNumber('Enter an integer exponent (−1000 to 1000):', 5, -1000, 1000, true);
writeLine(base + ' raised to ' + exponent + ' = ' + power(base, exponent));
