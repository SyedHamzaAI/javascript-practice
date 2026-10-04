// Chapters 21–25 — Question 15
// Validate an alphanumeric password

var password;
while (true) {
    password = prompt('Enter a password containing letters and numbers, at least 6 characters, not starting with a number:', 'JavaScript123');
    if (password === null) { writeLine('Password entry cancelled.'); break; }
    var hasLetter = false, hasNumber = false;
    for (var i = 0; i < password.length; i++) {
        var code = password.charCodeAt(i);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) { hasLetter = true; }
        if (code >= 48 && code <= 57) { hasNumber = true; }
    }
    var firstCode = password.charCodeAt(0);
    var startsWithNumber = firstCode >= 48 && firstCode <= 57;
    if (hasLetter && hasNumber && !startsWithNumber && password.length >= 6) {
        writeLine('Valid password. All assignment requirements are satisfied.');
        break;
    }
    alert('Invalid password. Include letters and numbers, use at least 6 characters, and do not start with a number.');
}
