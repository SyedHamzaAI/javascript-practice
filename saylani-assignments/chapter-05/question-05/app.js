// Chapters 5 — Question 5
// Display a multiplication table

var number = 4;
writeHeading('Table of ' + number);
for (var i = 1; i <= 10; i++) {
    writeLine(number + ' x ' + i + ' = ' + (number * i));
}
