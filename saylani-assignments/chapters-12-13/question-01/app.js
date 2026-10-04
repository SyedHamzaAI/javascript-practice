// Chapters 12–13 — Question 1
// Classify a character using ASCII codes

var character = askText('Enter one character:', 'A');
if (character.length !== 1) {
    writeLine('Please enter exactly one character.');
} else {
    var code = character.charCodeAt(0);
    if (code >= 48 && code <= 57) { writeLine(character + ' is a number.'); }
    else if (code >= 65 && code <= 90) { writeLine(character + ' is an uppercase letter.'); }
    else if (code >= 97 && code <= 122) { writeLine(character + ' is a lowercase letter.'); }
    else { writeLine(character + ' is a special character.'); }
}
