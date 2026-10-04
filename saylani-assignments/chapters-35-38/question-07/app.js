// Chapters 35–38 — Question 7
// Display counting between a start and end value

function countBetween(start, end) {
    var step = start <= end ? 1 : -1;
    for (var i = start; step > 0 ? i <= end : i >= end; i += step) { writeLine(i); }
}
var start = askNumber('Enter the starting integer (−1000 to 1000):', 1, -1000, 1000, true);
var end = askNumber('Enter the ending integer (−1000 to 1000):', 10, -1000, 1000, true);
countBetween(start, end);
