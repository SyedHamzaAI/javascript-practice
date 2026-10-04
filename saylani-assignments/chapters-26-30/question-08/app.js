// Chapters 26–30 — Question 8
// Guess a randomly generated secret number

var secretNumber = Math.floor(Math.random() * 10) + 1;
var guess = askNumber('Guess a whole number between 1 and 10:', 5, 1, 10, true);
if (guess === secretNumber) { writeLine('Congratulations! You guessed the secret number.'); }
else { writeLine('Try again! The secret number was ' + secretNumber + '.'); }
