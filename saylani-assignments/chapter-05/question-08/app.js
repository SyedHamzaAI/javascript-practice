// Chapters 5 — Question 8
// Compute marks percentage

var totalMarks = 980;
var marksObtained = 804;
var percentage = marksObtained / totalMarks * 100;
writeHeading('Marks Sheet');
writeLine('Total marks: ' + totalMarks);
writeLine('Marks obtained: ' + marksObtained);
writeLine('Percentage: ' + percentage.toFixed(2) + '%');
