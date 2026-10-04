// Chapters 53–57 — Question 1
// Open any of four images in a modal

var imagePaths = ['../../assets/1.jpg', '../../assets/2.jpg', '../../assets/3.jpg', '../../assets/5.jpg'];
var gallery = document.getElementById('gallery');
var markup = '';
for (var i = 0; i < imagePaths.length; i++) {
    markup += '<button class="image-card" type="button"><img src="' + imagePaths[i] + '" alt="Landscape ' + (i + 1) + '"><span>Open landscape ' + (i + 1) + '</span></button>';
}
gallery.innerHTML = markup;
var modal = document.getElementById('modal');
var modalImage = document.getElementById('modal-img');
var closeButton = document.getElementById('modal-close');
var closeTimer;
var lastFocusedButton;
var originalOverflow;

function onImageClick(button) {
    clearTimeout(closeTimer);
    lastFocusedButton = button;
    originalOverflow = document.body.style.overflow;
    var image = button.querySelector('img');
    modal.classList.add('modal-open');
    modal.classList.remove('modal-close');
    modal.style.display = 'block';
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
}

function onClosedImagModal() {
    modal.classList.add('modal-close');
    modal.classList.remove('modal-open');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
        modal.style.display = 'none';
        document.body.style.overflow = originalOverflow || '';
        if (lastFocusedButton) { lastFocusedButton.focus(); }
    }, 550);
}

var buttons = gallery.querySelectorAll('button');
for (var j = 0; j < buttons.length; j++) {
    buttons[j].onclick = function (event) { onImageClick(event.currentTarget); };
}
closeButton.onclick = onClosedImagModal;
modal.addEventListener('click', function (event) {
    if (event.target === modal) { onClosedImagModal(); }
});
document.addEventListener('keydown', function (event) {
    if (modal.style.display === 'block' && event.key === 'Escape') { onClosedImagModal(); }
    if (modal.style.display === 'block' && event.key === 'Tab') {
        event.preventDefault();
        closeButton.focus();
    }
});
writeLine('Click an image. Close its modal with ×, Escape or the backdrop.');
