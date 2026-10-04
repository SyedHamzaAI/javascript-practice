// Chapters 38–42 — Question 5
// Create a custom single-character indexOf function

function customIndexOf(text, character) {
    var i = 0;
    while (i < text.length) {
        if (text.charAt(i) === character) { return i; }
        i++;
    }
    return -1;
}
var text = askText('Enter some text:', 'JavaScript');
var character = askText('Enter a single character to find:', 'a');
if (character.length !== 1) { writeLine('Please search for exactly one character.'); }
else { writeLine('Index: ' + customIndexOf(text, character)); }
