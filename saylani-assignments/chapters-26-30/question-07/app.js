// Chapters 26–30 — Question 7
// Parse a weight that may include units

var input = askText('Enter your weight, e.g. 50, 50kgs or 50.2kilograms:', '50.2kgs');
var weight = parseFloat(input);
if (!Number.isFinite(weight) || weight <= 0) {
    writeLine('Please enter a positive weight beginning with a number.');
} else {
    writeLine('The weight of the user is ' + weight + ' kilograms.');
}
