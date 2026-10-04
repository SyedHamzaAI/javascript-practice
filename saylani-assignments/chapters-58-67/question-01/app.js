// Chapters 58–67 — Question 1
// Select DOM elements, display children and fill input values

// i. Get main-content and store it in a variable.
var mainContent = document.getElementById('main-content');
// ii. Display all child elements.
writeHeading('ii. Child elements of main-content');
for (var i = 0; i < mainContent.children.length; i++) {
    var child = mainContent.children[i];
    writeLine(child.tagName + ': ' + child.textContent);
}
// iii. Select all render elements and show their innerHTML.
var renderElements = document.getElementsByClassName('render');
writeHeading('iii. innerHTML of elements with class render');
for (var j = 0; j < renderElements.length; j++) {
    writeLine(renderElements[j].innerHTML);
}
// iv–v. Fill all three input values through JavaScript.
document.getElementById('first-name').value = 'Alex';
document.getElementById('last-name').value = 'Bank';
document.getElementById('email').value = 'alexbank@example.com';
writeLine('iv–v. The first-name, last-name and email input values have been filled.');
