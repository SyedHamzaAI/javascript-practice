// Chapters 49–52 — Question 2
// Expand item details with a Read more button

var shortDetails = 'A lightweight laptop for study, coding and everyday work.';
var fullDetails = shortDetails + ' It has a 14-inch display, 16 GB RAM, a 512 GB SSD and a comfortable keyboard. The included charger makes it ready for your next study session.';
var expanded = false;
var details = document.getElementById('item-details');
var button = document.getElementById('read-more');
details.textContent = shortDetails;
button.addEventListener('click', function () {
    expanded = !expanded;
    details.textContent = expanded ? fullDetails : shortDetails;
    button.textContent = expanded ? 'Read less' : 'Read more';
    button.setAttribute('aria-expanded', String(expanded));
});
writeLine('Use Read more to reveal the complete item description.');
