// Chapters 26–30 — Question 5
// Simulate a coin toss

var coin = Math.floor(Math.random() * 2) + 1;
var side = coin === 2 ? 'Heads' : 'Tails';
writeLine('Random coin value: ' + coin);
writeLine(side);
