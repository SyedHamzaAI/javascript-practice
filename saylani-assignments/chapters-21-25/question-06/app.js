// Chapters 21–25 — Question 6
// Merge names using concat

var firstName = askText('Enter your first name:', 'Hamza');
var lastName = askText('Enter your last name:', 'Hussain');
var fullName = firstName.concat(' ', lastName);
writeLine('Hello, ' + fullName + '!');
