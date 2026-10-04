// Chapters 14–16 — Question 10
// Sort student scores numerically in ascending order

var scores = [320, 230, 480, 120];
writeLine('Scores of students: ' + scores.join(', '));
scores.sort(function (a, b) { return a - b; });
writeLine('Ordered scores: ' + scores.join(', '));
