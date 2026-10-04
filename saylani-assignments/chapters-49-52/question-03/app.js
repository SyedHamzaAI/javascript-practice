// Chapters 49–52 — Question 3
// Add, edit and delete student records with forms

var students = [
    { id: 1, name: 'John', age: 16, className: '10' },
    { id: 2, name: 'Mark', age: 17, className: '11' },
    { id: 3, name: 'Alex', age: 16, className: '10' }
];
var nextId = 4;
var editingId = null;
var tableBody = document.getElementById('editable-student-rows');
var editForm = document.getElementById('edit-student-form');

function closeEditForm() {
    editingId = null;
    editForm.hidden = true;
    editForm.reset();
}

function renderStudents() {
    tableBody.replaceChildren();
    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var row = document.createElement('tr');
        var values = [student.id, student.name, student.age, student.className];
        for (var j = 0; j < values.length; j++) {
            var cell = document.createElement('td');
            cell.textContent = values[j];
            row.appendChild(cell);
        }
        var actions = document.createElement('td');
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.dataset.id = student.id;
        editButton.addEventListener('click', function () {
            editingId = Number(this.dataset.id);
            var selected = students.find(function (item) { return item.id === editingId; });
            document.getElementById('edit-name').value = selected.name;
            document.getElementById('edit-age').value = selected.age;
            document.getElementById('edit-class').value = selected.className;
            editForm.hidden = false;
            document.getElementById('edit-name').focus();
        });
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = student.id;
        deleteButton.addEventListener('click', function () {
            var id = Number(this.dataset.id);
            students = students.filter(function (item) { return item.id !== id; });
            if (editingId === id) { closeEditForm(); }
            renderStudents();
        });
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        row.appendChild(actions);
        tableBody.appendChild(row);
    }
    document.getElementById('student-count').textContent = students.length + ' student records';
}

document.getElementById('add-student-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('student-name').value.trim();
    var className = document.getElementById('student-class').value.trim();
    if (!name || !className) { return; }
    students.push({ id: nextId++, name: name, age: Number(document.getElementById('student-age').value), className: className });
    this.reset();
    renderStudents();
});

editForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var selected = students.find(function (item) { return item.id === editingId; });
    var name = document.getElementById('edit-name').value.trim();
    var className = document.getElementById('edit-class').value.trim();
    if (!selected || !name || !className) { return; }
    selected.name = name;
    selected.age = Number(document.getElementById('edit-age').value);
    selected.className = className;
    closeEditForm();
    renderStudents();
});
document.getElementById('cancel-edit').addEventListener('click', closeEditForm);
renderStudents();
writeLine('Add a student, use Edit to open the prefilled form, or use Delete to remove a record.');
