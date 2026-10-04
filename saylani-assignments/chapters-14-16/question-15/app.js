// Chapters 14–16 — Question 15
// Write a manufacturer dropdown using document.write

var manufacturers = ['Apple', 'Samsung', 'Motorola', 'Nokia', 'Sony', 'Haier'];
document.write('<label for="manufacturer">Phone manufacturer</label><select id="manufacturer">');
for (var i = 0; i < manufacturers.length; i++) {
    document.write('<option>' + manufacturers[i] + '</option>');
}
document.write('</select>');
