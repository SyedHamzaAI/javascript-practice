// Chapters 35–38 — Question 12
// Find the longest word in a string

function longestWord(text) {
    var words = text.match(/[a-zA-Z0-9]+/g) || [];
    var longest = '';
    for (var i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) { longest = words[i]; }
    }
    return longest;
}
writeLine(longestWord('Web Development Tutorial'));
