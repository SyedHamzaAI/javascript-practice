// Chapters 17–20 — Question 10
// Print multiples of five from one to one hundred

var multiples = [];
for (var i = 5; i <= 100; i += 5) { multiples.push(i); }
writeLine(multiples.join(', '));
