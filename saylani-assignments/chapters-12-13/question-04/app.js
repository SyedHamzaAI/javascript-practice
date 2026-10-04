// Chapters 12–13 — Question 4
// Return true or false for a vowel

var character = askText('Enter one character:', 'e').toLowerCase();
if (character.length !== 1) { writeLine('Please enter exactly one character.'); }
else {
    var isVowel = character === 'a' || character === 'e' || character === 'i' || character === 'o' || character === 'u';
    writeLine(isVowel);
}
