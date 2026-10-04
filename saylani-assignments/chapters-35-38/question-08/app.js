// Chapters 35–38 — Question 8
// Calculate hypotenuse with a nested square function

function calculateHypotenuse(base, perpendicular) {
    function calculateSquare(number) { return number * number; }
    return Math.sqrt(calculateSquare(base) + calculateSquare(perpendicular));
}
var base = askNumber('Enter the base:', 3, 0);
var perpendicular = askNumber('Enter the perpendicular:', 4, 0);
writeLine('Hypotenuse: ' + calculateHypotenuse(base, perpendicular));
