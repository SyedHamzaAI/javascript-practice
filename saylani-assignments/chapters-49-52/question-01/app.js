// Chapters 49–52 — Question 1
// Display signup form data on submission

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('signup-name').value.trim();
    var email = document.getElementById('signup-email').value.trim();
    var password = document.getElementById('signup-password').value;
    var result = document.getElementById('signup-result');
    result.replaceChildren();
    var details = ['Name: ' + name, 'Email: ' + email, 'Password: ' + '•'.repeat(password.length) + ' (masked)'];
    for (var i = 0; i < details.length; i++) {
        var paragraph = document.createElement('p');
        paragraph.textContent = details[i];
        result.appendChild(paragraph);
    }
    result.hidden = false;
});
writeLine('Submit the form to display its data below.');
