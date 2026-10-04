// Chapters 35–38 — Question 2
// Greet a user with a full-name function

function greetUser(firstName, lastName) {
    writeLine('Hello, ' + firstName + ' ' + lastName + '!');
}
var first = askText('Enter your first name:', 'Hamza');
var last = askText('Enter your last name:', 'Hussain');
greetUser(first, last);
