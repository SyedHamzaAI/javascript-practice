// Chapters 17–20 — Question 6
// Generate counting, reverse, even, odd and k series

var counting = [], reverse = [], even = [], odd = [], series = [];
for (var i = 1; i <= 15; i++) { counting.push(i); }
for (var j = 10; j >= 1; j--) { reverse.push(j); }
for (var k = 0; k <= 20; k += 2) { even.push(k); }
for (var n = 1; n < 20; n += 2) { odd.push(n); }
for (var m = 2; m <= 20; m += 2) { series.push(m + 'k'); }
writeLine('Counting: ' + counting.join(', '));
writeLine('Reverse counting: ' + reverse.join(', '));
writeLine('Even: ' + even.join(', '));
writeLine('Odd: ' + odd.join(', '));
writeLine('Series: ' + series.join(', '));
