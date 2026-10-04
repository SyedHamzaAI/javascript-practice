// Chapters 9–11 — Question 10
// Show a temperature message

var temperature = askNumber('Enter temperature in Celsius:', 35);
if (temperature > 40) { writeLine('It is too hot outside.'); }
else if (temperature > 30) { writeLine('The Weather today is Normal.'); }
else if (temperature > 20) { writeLine('Today’s Weather is cool.'); }
else if (temperature > 10) { writeLine('OMG! Today’s weather is so Cool.'); }
else { writeLine('It is cold outside.'); }
