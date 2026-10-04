// Chapters 35–38 — Question 13
// Count occurrences of a specified letter

function countLetter(text, letter) {
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) === letter) { count++; }
    }
    return count;
}
writeLine("Occurrences of 'o' in JSResourceS.com: " + countLetter('JSResourceS.com', 'o'));
