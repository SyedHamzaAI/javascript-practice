// Chapters 38–42 — Question 2
// Determine whether a year is a leap year

function isLeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
var year = askNumber('Enter a year:', 2024, 1, 9999, true);
writeLine(year + ' is a leap year: ' + isLeapYear(year));
