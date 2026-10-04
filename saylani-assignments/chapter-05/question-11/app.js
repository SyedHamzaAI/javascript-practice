// Chapters 5 — Question 11
// Calculate the two possible ages

var currentYear = new Date().getFullYear();
var birthYear = 2000;
var age = currentYear - birthYear;
writeLine('They are either ' + (age - 1) + ' or ' + age + ' years old.');
