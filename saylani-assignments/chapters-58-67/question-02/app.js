// Chapters 58–67 — Question 2
// Inspect node types, child nodes, siblings and a parent

function describeNode(node) {
    if (!node) { return 'None'; }
    return node.nodeName + ' (node type ' + node.nodeType + '): ' + JSON.stringify(node.textContent.trim());
}
var formContent = document.getElementById('form-content');
var lastName = document.getElementById('lastName');
var mainContent = document.getElementById('main-content');
var email = document.getElementById('email');
writeLine('i. form-content node type: ' + formContent.nodeType);
writeLine('ii. lastName node type: ' + lastName.nodeType);
writeLine('ii. lastName child node type: ' + lastName.firstChild.nodeType);
lastName.firstChild.nodeValue = 'Last Name: Hussain';
writeLine('iii. Updated child node: ' + lastName.firstChild.nodeValue);
writeLine('iv. First child: ' + describeNode(mainContent.firstChild));
writeLine('iv. Last child: ' + describeNode(mainContent.lastChild));
writeLine('v. Next sibling: ' + describeNode(lastName.nextSibling));
writeLine('v. Previous sibling: ' + describeNode(lastName.previousSibling));
writeLine('vi. Email parent: ' + email.parentNode.id + ', node type: ' + email.parentNode.nodeType);
// Indentation creates whitespace text nodes. Show element-only alternatives too.
writeHeading('Element-only navigation (ignores whitespace text nodes)');
writeLine('First element child: ' + describeNode(mainContent.firstElementChild));
writeLine('Last element child: ' + describeNode(mainContent.lastElementChild));
writeLine('Next element sibling: ' + describeNode(lastName.nextElementSibling));
writeLine('Previous element sibling: ' + describeNode(lastName.previousElementSibling));
