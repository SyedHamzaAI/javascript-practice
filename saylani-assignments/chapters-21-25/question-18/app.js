// Chapters 21–25 — Question 18
// Count occurrences of the word the

var text = 'The quick brown fox jumps over the lazy dog';
var words = text.toLowerCase().split(/\s+/);
var count = 0;
for (var i = 0; i < words.length; i++) {
    if (words[i] === 'the') { count++; }
}
writeLine('Text: ' + text);
writeLine("There are " + count + " occurrences of the word 'the'.");
