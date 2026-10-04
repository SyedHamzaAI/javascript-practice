// Chapters 17–20 — Question 8
// Find the largest array value using a loop

var numbers = [24, 53, 78, 91, 12];
var largest = numbers[0];
for (var i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) { largest = numbers[i]; }
}
writeLine('Array items: ' + numbers.join(', '));
writeLine('The largest number is ' + largest);
