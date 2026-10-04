// Chapters 38–42 — Question 10
// Count hundred, fifty and ten rupee notes

var amount = askNumber('Enter the amount to withdraw in rupees:', 470, 0, 1000000000, true);
var hundreds = Math.floor(amount / 100);
var remaining = amount % 100;
var fifties = Math.floor(remaining / 50);
var tens = Math.floor((remaining % 50) / 10);
var remainder = amount % 10;
writeLine('Amount: Rs. ' + amount);
writeLine('100-rupee notes: ' + hundreds);
writeLine('50-rupee notes: ' + fifties);
writeLine('10-rupee notes: ' + tens);
writeLine('Total notes: ' + (hundreds + fifties + tens));
if (remainder !== 0) {
    writeLine('Rs. ' + remainder + ' cannot be paid with the available denominations. Use a multiple of 10 for exact withdrawal.');
}
