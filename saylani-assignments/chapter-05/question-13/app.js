// Chapters 5 — Question 13
// Calculate a lifetime supply of snacks

var favoriteSnack = 'chocolate chip cookies';
var currentAge = 26;
var maximumAge = 80;
var amountPerDay = 2;
// Use 365 days per year as the exercise estimate.
var totalSnacks = (maximumAge - currentAge) * 365 * amountPerDay;
writeLine('Favorite snack: ' + favoriteSnack);
writeLine('You will need ' + totalSnacks + ' ' + favoriteSnack + ' to last you until the ripe old age of ' + maximumAge + '.');
