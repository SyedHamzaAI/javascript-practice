// Chapters 21–25 — Question 1
// Merge first and last names and greet the user

var firstName = askText('Enter your first name:', 'Hamza');
var lastName = askText('Enter your last name:', 'Hussain');
var fullName = firstName + ' ' + lastName;
writeLine('Hello, ' + fullName + '!');
