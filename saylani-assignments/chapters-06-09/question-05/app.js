// Chapters 6–9 — Question 5
// Show a multiplication table with default number five

// askNumber uses the default when input is empty or Cancel is clicked.
var number = askNumber('Enter a table number (leave empty for 5):', 5);
for (var i = 1; i <= 10; i++) {
    writeLine(number + ' x ' + i + ' = ' + (number * i));
}
