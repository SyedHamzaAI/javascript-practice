// Chapters 31–34 — Question 14
// Generate a K-Electric bill

// These are illustrative exercise amounts, not a current tariff.
var customerName = askText('Enter customer name:', 'Syed Hamza Hussain');
var currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
var units = askNumber('Enter the number of units:', 410, 0);
var chargePerUnit = askNumber('Enter charges per unit:', 16, 0);
var lateSurcharge = askNumber('Enter late payment surcharge:', 350, 0);
var netAmount = units * chargePerUnit;
var grossAmount = netAmount + lateSurcharge;
writeHeading('K-Electric Bill');
writeLine('Customer name: ' + customerName);
writeLine('Month: ' + currentMonth);
writeLine('Number of units: ' + units.toFixed(2));
writeLine('Charges per unit: ' + chargePerUnit.toFixed(2));
writeLine('Net Amount Payable (within Due Date): ' + netAmount.toFixed(2));
writeLine('Late Payment Surcharge: ' + lateSurcharge.toFixed(2));
writeLine('Gross Amount Payable (after Due Date): ' + grossAmount.toFixed(2));
