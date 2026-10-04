// Chapters 9–11 — Question 3
// Show the message for a traffic signal color

var color = askText('Enter traffic signal color (red/yellow/green):', 'red').toLowerCase();
if (color === 'red') {
    writeLine('Must Stop');
} else if (color === 'yellow') {
    writeLine('Ready to move');
} else if (color === 'green') {
    writeLine('Move now');
} else {
    writeLine('Please enter red, yellow or green.');
}
