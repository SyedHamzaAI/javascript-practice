// Chapters 38–42 — Question 3
// Calculate triangle area with two functions

function semiPerimeter(a, b, c) { return (a + b + c) / 2; }
function triangleArea(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) { return null; }
    var s = semiPerimeter(a, b, c);
    // Heron's formula: sqrt(s * (s-a) * (s-b) * (s-c)).
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}
var a = askNumber('Enter side a:', 3, Number.MIN_VALUE);
var b = askNumber('Enter side b:', 4, Number.MIN_VALUE);
var c = askNumber('Enter side c:', 5, Number.MIN_VALUE);
var area = triangleArea(a, b, c);
if (area === null) { writeLine('These sides cannot form a triangle.'); }
else { writeLine('Triangle area: ' + area.toFixed(2)); }
