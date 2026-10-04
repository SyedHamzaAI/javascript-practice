// Chapters 9–11 — Question 5
// Run and record all conditional alert examples

var a = 4;
if (++a === 5) { alert('given condition for variable a is true'); }
writeLine('a: alert displayed; ++a evaluates to 5.');

var b = 82;
if (b++ === 83) { alert('given condition for variable b is true'); }
writeLine('b: no alert; b++ compares 82, then b becomes 83.');

var c = 12;
if (c++ === 13) { alert('condition 1 is true'); }
if (c === 13) { alert('condition 2 is true'); }
if (++c < 14) { alert('condition 3 is true'); }
if (c === 14) { alert('condition 4 is true'); }
writeLine('c: conditions 2 and 4 display alerts; conditions 1 and 3 do not. Final c = ' + c + '.');

var materialCost = 20000, laborCost = 2000;
var totalCost = materialCost + laborCost;
if (totalCost === laborCost + materialCost) { alert('The cost equals'); }
if (true) { alert('True'); }
if (false) { alert('False'); }
if ('car' < 'cat') { alert('car is smaller than cat'); }
writeLine('d: The cost equals. e: True only. f: car is smaller than cat.');
