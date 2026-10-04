// Chapters 21–25 — Question 17
// Display the last character of user input

var input = askText('Enter some text:', 'Pakistan');
writeLine('User input: ' + input);
writeLine('Last character: ' + input.charAt(input.length - 1));
