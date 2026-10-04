// Chapters 9–11 — Question 4
// Check whether the car needs fuel

var fuel = askNumber('Enter remaining fuel in litres:', 0.2, 0);
if (fuel < 0.25) {
    alert('Please refill the fuel in your car');
    writeLine('Please refill the fuel in your car');
} else {
    writeLine('There is enough fuel for the exercise threshold.');
}
