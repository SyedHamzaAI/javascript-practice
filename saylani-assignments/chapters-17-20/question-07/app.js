// Chapters 17–20 — Question 7
// Search for a bakery item using a loop

var items = ['cake', 'apple pie', 'cookie', 'chips', 'patties'];
var search = askText('Welcome to our bakery. What do you want to order?', 'cookie');
var foundIndex = -1;
for (var i = 0; i < items.length; i++) {
    if (items[i] === search) { foundIndex = i; break; }
}
if (foundIndex !== -1) {
    writeLine(search + ' is available at index ' + foundIndex + ' in our bakery.');
} else {
    writeLine('We are sorry. ' + search + ' is not available in our bakery.');
}
