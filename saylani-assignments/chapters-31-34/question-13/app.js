// Chapters 31–34 — Question 13
// Estimate birth year from age

var age = askNumber('Enter your age in whole years:', 26, 0, 130, true);
var currentYear = new Date().getFullYear();
var birthYear = currentYear - age;
writeLine('Your age is ' + age);
writeLine('Your estimated birth year is ' + birthYear + ' (assuming your birthday has passed this year).');
