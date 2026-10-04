// Chapters 21–25 — Question 14
// Perform a case-insensitive bakery search

var items = ['cake', 'apple pie', 'cookie', 'chips', 'patties'];
var input = askText('What would you like to order?', 'COOKIE');
var search = input.toLowerCase();
var index = items.indexOf(search);
if (index !== -1) { writeLine(search + ' is available at index ' + index + ' in our bakery.'); }
else { writeLine('We are sorry. ' + input + ' is not available in our bakery.'); }
