// Chapters 38–42 — Question 6
// Delete all vowels from a short sentence

function deleteVowels(sentence) {
    return sentence.replace(/[aeiou]/gi, '');
}
var sentence = askText('Enter a sentence of at most 25 characters:', 'Hello World');
if (sentence.length > 25) { writeLine('Please enter at most 25 characters.'); }
else { writeLine('Without vowels: ' + deleteVowels(sentence)); }
