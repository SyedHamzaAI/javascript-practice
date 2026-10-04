// Chapters 17–20 — Question 4
// Take a table number and length from the user

var number = askNumber('Enter a number for the multiplication table:', 2);
var length = askNumber('Enter the table length (1–1000):', 15, 1, 1000, true);
writeHeading('Multiplication table of ' + number + ' (length ' + length + ')');
for (var i = 1; i <= length; i++) {
    writeLine(number + ' x ' + i + ' = ' + (number * i));
}
