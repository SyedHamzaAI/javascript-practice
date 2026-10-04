// Chapters 4 — Question 2
// Show five legal and five illegal variable names

var fullName, age2, _city, $price, student_name;
// Illegal names are comments because declaring them would cause a SyntaxError:
// var 2age;          // Starts with a digit.
// var full-name;     // Contains a hyphen.
// var student name;  // Contains a space.
// var var;           // Reserved keyword.
// var @email;        // Contains an unsupported symbol.
writeLine('Legal: fullName, age2, _city, $price, student_name');
writeLine('Illegal: 2age, full-name, student name, var, @email');
