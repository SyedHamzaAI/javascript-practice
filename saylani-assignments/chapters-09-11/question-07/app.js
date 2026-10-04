// Chapters 9–11 — Question 7
// Guess the secret number

var secretNumber = 7;
var guess = askNumber('Guess a whole number from 1 to 10:', 7, 1, 10, true);
if (guess === secretNumber) {
    writeLine('Bingo! Correct answer');
} else if (guess + 1 === secretNumber) {
    writeLine('Close enough to the correct answer');
} else {
    writeLine('Try again!');
}
