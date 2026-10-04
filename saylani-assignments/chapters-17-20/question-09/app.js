// Chapters 17–20 — Question 9
// Find the smallest array value using a loop

var numbers = [24, 53, 78, 91, 12];
var smallest = numbers[0];
for (var i = 1; i < numbers.length; i++) {
    if (numbers[i] < smallest) { smallest = numbers[i]; }
}
writeLine('Array items: ' + numbers.join(', '));
writeLine('The smallest number is ' + smallest);
