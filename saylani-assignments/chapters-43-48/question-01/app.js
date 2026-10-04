// Chapters 43–48 — Question 1
// Show an alert when a link is clicked

document.getElementById('alert-link').addEventListener('click', function (event) {
    event.preventDefault();
    alert('You clicked the link!');
});
writeLine('Click the link above to show its alert.');
