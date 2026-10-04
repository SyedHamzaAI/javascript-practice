// Chapters 14–16 — Question 9
// Add and remove colors with array methods

var colors = ['Red', 'Green', 'Blue'];
writeLine('Initial colors: ' + colors.join(', '));
colors.unshift(askText('Which color should be added to the beginning?', 'Yellow'));
writeLine('a. Add to beginning: ' + colors.join(', '));
colors.push(askText('Which color should be added to the end?', 'Purple'));
writeLine('b. Add to end: ' + colors.join(', '));
colors.unshift('Orange', 'Pink');
writeLine('c. Add two to beginning: ' + colors.join(', '));
colors.shift();
writeLine('d. Delete first: ' + colors.join(', '));
colors.pop();
writeLine('e. Delete last: ' + colors.join(', '));
var insertIndex = askNumber('At which index should a color be added?', 2, 0, colors.length, true);
var newColor = askText('Enter the color to add:', 'White');
colors.splice(insertIndex, 0, newColor);
writeLine('f. Insert at index ' + insertIndex + ': ' + colors.join(', '));
var deleteIndex = askNumber('At which index should deletion start?', 1, 0, colors.length - 1, true);
var deleteCount = askNumber('How many colors should be deleted?', 2, 0, colors.length - deleteIndex, true);
colors.splice(deleteIndex, deleteCount);
writeLine('g. Delete ' + deleteCount + ' colors: ' + colors.join(', '));
