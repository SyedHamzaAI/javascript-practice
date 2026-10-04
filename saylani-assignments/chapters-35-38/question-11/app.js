// Chapters 35–38 — Question 11
// Capitalize the first letter of every word

function titleCase(text) {
    var words = text.toLowerCase().split(/\s+/);
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}
writeLine(titleCase('the quick brown fox'));
