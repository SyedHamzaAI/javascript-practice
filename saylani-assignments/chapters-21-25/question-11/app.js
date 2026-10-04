// Chapters 21–25 — Question 11
// Convert user input to title case

var input = askText('Enter some text:', 'javascript development');
var words = input.toLowerCase().split(/\s+/);
for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
}
writeLine('User input: ' + input);
writeLine('Title case: ' + words.join(' '));
