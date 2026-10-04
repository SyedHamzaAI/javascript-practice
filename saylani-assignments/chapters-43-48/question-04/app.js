// Chapters 43–48 — Question 4
// Change a picture on mouseover and restore on mouseout

var image = document.getElementById('hover-image');
var originalImage = '../../assets/1.jpg';
var alternateImage = '../../assets/2.jpg';
function showAlternate() { image.src = alternateImage; image.alt = 'Alternate landscape'; }
function restoreOriginal() { image.src = originalImage; image.alt = 'Original landscape'; }
image.addEventListener('mouseover', showAlternate);
image.addEventListener('mouseout', restoreOriginal);
image.addEventListener('focus', showAlternate);
image.addEventListener('blur', restoreOriginal);
writeLine('Move your mouse onto the picture, then away. Keyboard focus also demonstrates the change.');
