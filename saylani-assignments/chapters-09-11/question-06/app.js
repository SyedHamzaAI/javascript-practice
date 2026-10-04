// Chapters 9–11 — Question 6
// Calculate percentage, grade and remarks

var totalMarks = askNumber('Enter total marks for all three subjects:', 300, 1);
var first = askNumber('Enter marks for subject 1:', 80, 0, totalMarks);
var second = askNumber('Enter marks for subject 2:', 75, 0, totalMarks);
var third = askNumber('Enter marks for subject 3:', 64, 0, totalMarks);
var obtainedMarks = first + second + third;
if (obtainedMarks > totalMarks) {
    writeLine('The sum of obtained marks cannot exceed total marks. Reload and enter consistent marks.');
} else {
    var percentage = obtainedMarks / totalMarks * 100;
    var grade, remarks;
    if (percentage >= 80) { grade = 'A-one'; remarks = 'Excellent'; }
    else if (percentage >= 70) { grade = 'A'; remarks = 'Good'; }
    else if (percentage >= 60) { grade = 'B'; remarks = 'You need to improve'; }
    else { grade = 'Fail'; remarks = 'Sorry'; }
    writeHeading('Marks Sheet');
    writeLine('Total marks: ' + totalMarks);
    writeLine('Marks obtained: ' + obtainedMarks);
    writeLine('Percentage: ' + percentage.toFixed(2) + '%');
    writeLine('Grade: ' + grade);
    writeLine('Remarks: ' + remarks);
}
