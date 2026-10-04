// Chapters 38–42 — Question 7
// Count adjacent vowel pairs using switch

function isVowel(character) {
    switch (character) {
        case 'a': case 'e': case 'i': case 'o': case 'u': return true;
        default: return false;
    }
}
function countVowelPairs(text) {
    var sentence = text.toLowerCase();
    var count = 0, pairs = [], i = 0;
    while (i < sentence.length - 1) {
        if (isVowel(sentence.charAt(i)) && isVowel(sentence.charAt(i + 1))) {
            count++;
            pairs.push(sentence.slice(i, i + 2));
        }
        i++;
    }
    return { count: count, pairs: pairs };
}
var text = 'Pleases read this application and give me gratuity';
var result = countVowelPairs(text);
writeLine('Text: ' + text);
writeLine('Adjacent vowel pairs: ' + result.pairs.join(', '));
writeLine('Count: ' + result.count);
