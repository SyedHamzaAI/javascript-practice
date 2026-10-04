// Chapters 21–25 — Question 13
// Validate a username using character codes

var username;
while (true) {
    username = prompt('Enter a username without @ . , !:', 'Hamza');
    if (username === null) { writeLine('Username entry cancelled.'); break; }
    var invalid = username.trim() === '';
    for (var i = 0; i < username.length; i++) {
        var code = username.charCodeAt(i);
        if (code === 33 || code === 44 || code === 46 || code === 64) { invalid = true; }
    }
    if (!invalid) { writeLine('Valid username: ' + username); break; }
    alert('Please enter a valid username without @ . , !');
}
