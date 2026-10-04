// Chapters 43–48 — Question 3
// Delete any of ten student records

var students = ['John', 'Mark', 'Alex', 'Tony', 'Sara', 'Ali', 'Sami', 'Ayesha', 'Hamza', 'Zain'];
var tbody = document.getElementById('student-rows');
for (var i = 0; i < students.length; i++) {
    var row = document.createElement('tr');
    var values = [i + 1, students[i], 10];
    for (var j = 0; j < values.length; j++) {
        var cell = document.createElement('td');
        cell.textContent = values[j];
        row.appendChild(cell);
    }
    var actionCell = document.createElement('td');
    var button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', function () { this.closest('tr').remove(); });
    actionCell.appendChild(button);
    row.appendChild(actionCell);
    tbody.appendChild(row);
}
writeLine('Each Delete button removes its entire student row.');
