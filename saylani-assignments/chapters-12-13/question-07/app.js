// Chapters 12–13 — Question 7
// Choose a greeting using 24-hour clock time

var time = askNumber('Enter time as HHMM, e.g. 1900:', 1900, 0, 2359, true);
if (time % 100 >= 60) {
    writeLine('Invalid time: the minutes must be between 00 and 59.');
} else if (time < 1200) {
    writeLine('Good morning!');
} else if (time < 1700) {
    writeLine('Good afternoon!');
} else if (time < 2100) {
    writeLine('Good evening!');
} else {
    writeLine('Good night!');
}
