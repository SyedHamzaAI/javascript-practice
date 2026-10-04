// Chapters 6–9 — Question 6
// Collect three subjects and calculate a marks table

var subject1 = askText('Enter the first subject:', 'English');
var subject2 = askText('Enter the second subject:', 'Math');
var subject3 = askText('Enter the third subject:', 'Urdu');
var totalPerSubject = 100;
var marks1 = askNumber('Marks obtained in ' + subject1 + ' (0–100):', 54, 0, 100);
var marks2 = askNumber('Marks obtained in ' + subject2 + ' (0–100):', 54, 0, 100);
var marks3 = askNumber('Marks obtained in ' + subject3 + ' (0–100):', 48, 0, 100);
var totalMarks = totalPerSubject * 3;
var totalObtained = marks1 + marks2 + marks3;
writeTable(['Subject', 'Total marks', 'Obtained marks', 'Percentage'], [
    [subject1, totalPerSubject, marks1, (marks1 / totalPerSubject * 100).toFixed(2) + '%'],
    [subject2, totalPerSubject, marks2, (marks2 / totalPerSubject * 100).toFixed(2) + '%'],
    [subject3, totalPerSubject, marks3, (marks3 / totalPerSubject * 100).toFixed(2) + '%'],
    ['Total', totalMarks, totalObtained, (totalObtained / totalMarks * 100).toFixed(2) + '%']
]);
