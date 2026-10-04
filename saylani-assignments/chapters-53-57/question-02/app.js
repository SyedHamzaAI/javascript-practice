// Chapters 53–57 — Question 2
// Zoom paragraph text in and out by ten pixels

var paragraph = document.getElementById('zoom-paragraph');
var fontSize = 20;
function updateFontSize() {
    paragraph.style.fontSize = fontSize + 'px';
    document.getElementById('font-size').textContent = fontSize + 'px';
}
document.getElementById('zoom-in').addEventListener('click', function () {
    fontSize += 10;
    updateFontSize();
});
document.getElementById('zoom-out').addEventListener('click', function () {
    // Stop at 10px rather than assigning zero or a negative CSS font size.
    fontSize = Math.max(10, fontSize - 10);
    updateFontSize();
});
updateFontSize();
writeLine('Every step is 10px, with a minimum readable size of 10px.');
