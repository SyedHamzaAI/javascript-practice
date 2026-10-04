// Chapters 38–42 — Question 8
// Convert kilometres with four functions

function toMeters(km) { return km * 1000; }
function toFeet(km) { return km * 1000 / 0.3048; }
function toInches(km) { return km * 1000 / 0.0254; }
function toCentimeters(km) { return km * 100000; }
var distance = askNumber('Enter distance between two cities in kilometres:', 5, 0);
writeLine('Metres: ' + toMeters(distance).toFixed(2));
writeLine('Feet: ' + toFeet(distance).toFixed(2));
writeLine('Inches: ' + toInches(distance).toFixed(2));
writeLine('Centimetres: ' + toCentimeters(distance).toFixed(2));
