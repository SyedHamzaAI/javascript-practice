// Chapters 9–11 — Question 2
// Greet the user based on gender

var gender = askText('Enter gender (male/female):', 'male').toLowerCase();
if (gender === 'male') {
    writeLine('Good Morning Sir.');
} else if (gender === 'female') {
    writeLine('Good Morning Ma’am.');
} else {
    writeLine('Good Morning!');
}
