// Chapters 14–16 — Question 14
// Use an array as a last-in, first-out stack

var stack = [];
stack.push('keyboard');
stack.push('mouse');
stack.push('printer');
stack.push('monitor');
writeLine('Devices: ' + stack.join(', '));
while (stack.length > 0) {
    writeLine('Out: ' + stack.pop());
}
