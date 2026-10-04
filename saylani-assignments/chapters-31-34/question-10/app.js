// Chapters 31–34 — Question 10
// Calculate seconds since the beginning of 2015

// Use the reference date displayed in the PDF's example.
var referenceDate = new Date(2015, 11, 5, 22, 50, 16);
var beginningOf2015 = new Date(2015, 0, 1);
var secondsElapsed = (referenceDate.getTime() - beginningOf2015.getTime()) / 1000;
writeLine('On reference date ' + referenceDate.toString());
writeLine(secondsElapsed + ' seconds had passed since beginning of 2015.');
