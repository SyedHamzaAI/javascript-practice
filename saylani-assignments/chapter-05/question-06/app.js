// Chapters 5 — Question 6
// Convert Celsius and Fahrenheit

var celsius = 25;
var fahrenheit = (celsius * 9 / 5) + 32;
writeLine(celsius + '°C is ' + fahrenheit + '°F');
var temperatureF = 70;
var temperatureC = (temperatureF - 32) * 5 / 9;
writeLine(temperatureF + '°F is ' + temperatureC.toFixed(2) + '°C');
