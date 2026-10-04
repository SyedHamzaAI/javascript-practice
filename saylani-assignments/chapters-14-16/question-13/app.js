// Chapters 14–16 — Question 13
// Use an array as a first-in, first-out queue

var queue = [];
queue.push('keyboard');
queue.push('mouse');
queue.push('printer');
queue.push('monitor');
writeLine('Devices: ' + queue.join(', '));
while (queue.length > 0) {
    writeLine('Out: ' + queue.shift());
}
