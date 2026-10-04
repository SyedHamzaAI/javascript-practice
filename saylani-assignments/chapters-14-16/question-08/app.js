// Chapters 14–16 — Question 8
// Display student scores and percentages

var students = ['Michael', 'John', 'Tony'];
var scores = [320, 230, 480];
var totalMarks = 500;
for (var i = 0; i < students.length; i++) {
    writeLine('Score of ' + students[i] + ' is ' + scores[i] + '. Percentage: ' + (scores[i] / totalMarks * 100).toFixed(2) + '%');
}
