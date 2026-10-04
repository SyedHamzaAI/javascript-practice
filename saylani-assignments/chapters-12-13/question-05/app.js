// Chapters 12–13 — Question 5
// Validate a password against the stored password

var correctPassword = 'JavaScript123';
var password = prompt('Enter your password (demo password: JavaScript123):', 'JavaScript123');
if (password === null || password.trim() === '') {
    writeLine('Please enter your password');
} else if (password === correctPassword) {
    writeLine('Correct! The password you entered matches the original password');
} else {
    writeLine('Incorrect password');
}
