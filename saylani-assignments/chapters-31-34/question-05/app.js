// Chapters 31–34 — Question 5
// Identify the first fifteen or last days of the month

var date = new Date().getDate();
if (date < 16) { writeLine('First fifteen days of the month'); }
else { writeLine('Last days of the month'); }
