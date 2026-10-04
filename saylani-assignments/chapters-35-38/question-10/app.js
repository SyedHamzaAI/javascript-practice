// Chapters 35–38 — Question 10
// Check whether a string is a palindrome

function isPalindrome(text) {
    var normalized = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized.length === 0) { return false; }
    return normalized === normalized.split('').reverse().join('');
}
var text = askText('Enter a word or phrase:', 'madam');
writeLine(text + ' is a palindrome: ' + isPalindrome(text));
