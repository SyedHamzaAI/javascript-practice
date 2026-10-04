// Chapters 43–48 — Question 2
// Show mobile images and alert on selection

var mobileButtons = document.querySelectorAll('[data-phone]');
for (var i = 0; i < mobileButtons.length; i++) {
    mobileButtons[i].addEventListener('click', function () {
        alert('Thanks for purchasing a ' + this.dataset.phone + ' from us!');
    });
}
writeLine('Click a mobile image to see its purchase message.');
