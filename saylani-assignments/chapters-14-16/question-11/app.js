// Chapters 14–16 — Question 11
// Copy three cities using slice

var cities = ['Karachi', 'Lahore', 'Islamabad', 'Quetta', 'Peshawar'];
var selectedCities = cities.slice(2, 5);
writeLine('Cities list: ' + cities.join(', '));
writeLine('Selected cities: ' + selectedCities.join(', '));
