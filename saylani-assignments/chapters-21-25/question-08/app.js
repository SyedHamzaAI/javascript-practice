// Chapters 21–25 — Question 8
// Replace every occurrence of and with an ampersand

var message = 'Ali and Sami are best friends. They play cricket and football together.';
var updatedMessage = message.replace(/and/g, '&');
writeLine('Original: ' + message);
writeLine('After replacement: ' + updatedMessage);
