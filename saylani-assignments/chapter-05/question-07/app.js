// Chapters 5 — Question 7
// Calculate a shopping cart receipt

var priceOfItem1 = 650;
var priceOfItem2 = 100;
var quantityOfItem1 = 3;
var quantityOfItem2 = 7;
var shippingCharges = 100;
var totalCost = priceOfItem1 * quantityOfItem1 + priceOfItem2 * quantityOfItem2 + shippingCharges;
writeHeading('Shopping Cart');
writeLine('Price of item 1: ' + priceOfItem1 + ' PKR; quantity: ' + quantityOfItem1);
writeLine('Price of item 2: ' + priceOfItem2 + ' PKR; quantity: ' + quantityOfItem2);
writeLine('Shipping charges: ' + shippingCharges + ' PKR');
writeLine('Total cost of your order is ' + totalCost + ' PKR.');
