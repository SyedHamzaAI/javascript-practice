// Chapters 38–42 — Question 9
// Calculate overtime pay above forty hours

// Use the assignment's fixed Rs. 12/hour rate, not real payroll policy.
var hoursWorked = askNumber('Enter total whole hours worked:', 45, 0, 168, true);
var overtimeHours = Math.max(0, hoursWorked - 40);
var overtimePay = overtimeHours * 12;
writeLine('Overtime hours: ' + overtimeHours);
writeLine('Overtime pay: Rs. ' + overtimePay.toFixed(2));
