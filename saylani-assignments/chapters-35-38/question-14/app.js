// Chapters 35–38 — Question 14
// Create circumference and area functions

function calcCircumference(radius) { return 2 * Math.PI * radius; }
function calcArea(radius) { return Math.PI * radius * radius; }
var radius = askNumber('Enter the circle radius:', 5, 0);
writeLine('The circumference is ' + calcCircumference(radius).toFixed(2));
writeLine('The area is ' + calcArea(radius).toFixed(2));
