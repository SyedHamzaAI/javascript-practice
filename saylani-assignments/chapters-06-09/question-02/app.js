// Chapters 6–9 — Question 2
// Explain each stage of the mixed operator expression

var a = 2, b = 1;
var result = --a - --b + ++b + b--;
writeLine('a is ' + a);
writeLine('b is ' + b);
writeLine('result is ' + result);
// Trace the same expression once from the original a = 2, b = 1.
writeLine('--a: a becomes 1; this operand is 1.');
writeLine('--a - --b: b becomes 0; the running result is 1 - 0 = 1.');
writeLine('--a - --b + ++b: b becomes 1; the running result is 1 + 1 = 2.');
writeLine('--a - --b + ++b + b--: use b = 1, then decrement b to 0; result = 2 + 1 = 3.');
