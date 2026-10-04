// Chapters 31–34 — Question 4
// Identify a weekend fun day

var day = new Date().getDay();
if (day === 0 || day === 6) { writeLine('It’s Fun day'); }
else { writeLine('It is a weekday.'); }
