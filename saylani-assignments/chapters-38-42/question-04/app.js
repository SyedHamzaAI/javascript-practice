// Chapters 38–42 — Question 4
// Calculate average and percentage with three functions

function average(first, second, third) { return (first + second + third) / 3; }
function percentage(first, second, third) { return (first + second + third) / 300 * 100; }
function mainFunction(first, second, third) {
    writeLine('Total marks per subject: 100');
    writeLine('Average: ' + average(first, second, third).toFixed(2));
    writeLine('Percentage: ' + percentage(first, second, third).toFixed(2) + '%');
}
var first = askNumber('Enter marks for subject 1 (out of 100):', 90, 0, 100);
var second = askNumber('Enter marks for subject 2 (out of 100):', 80, 0, 100);
var third = askNumber('Enter marks for subject 3 (out of 100):', 70, 0, 100);
mainFunction(first, second, third);
