// Chapters 9–11 — Question 1
// Welcome visitors to Karachi

var city = askText('Enter your city:', 'Karachi');
if (city.toLowerCase() === 'karachi') {
    writeLine('Welcome to city of lights');
} else {
    writeLine('Welcome to ' + city + '!');
}
