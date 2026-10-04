// Chapters 43–48 — Question 5
// Increase and decrease a counter

var count = 0;
var display = document.getElementById('counter');
document.getElementById('increase').addEventListener('click', function () {
    count++;
    display.textContent = count;
});
document.getElementById('decrease').addEventListener('click', function () {
    count--;
    display.textContent = count;
});
writeLine('Each click changes the counter by one.');
