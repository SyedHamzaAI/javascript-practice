// Shared display and prompt helpers. Each question's actual solution is in app.js.
function writeLine(value) {
    var paragraph = document.createElement('p');
    paragraph.textContent = String(value);
    document.getElementById('output').appendChild(paragraph);
}

function writeHeading(value) {
    var heading = document.createElement('h2');
    heading.textContent = String(value);
    document.getElementById('output').appendChild(heading);
}

function writeTable(headers, rows) {
    var wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    for (var i = 0; i < headers.length; i++) {
        var header = document.createElement('th');
        header.textContent = headers[i];
        header.scope = 'col';
        headerRow.appendChild(header);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    for (var r = 0; r < rows.length; r++) {
        var row = document.createElement('tr');
        for (var c = 0; c < rows[r].length; c++) {
            var cell = document.createElement('td');
            cell.textContent = rows[r][c];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    wrapper.appendChild(table);
    document.getElementById('output').appendChild(wrapper);
}

function askText(message, defaultValue) {
    var input = prompt(message, defaultValue);
    return input === null || input.trim() === '' ? String(defaultValue) : input.trim();
}

function askNumber(message, defaultValue, minimum, maximum, integerOnly) {
    // Keep the fallback inside the requested range even if a dynamic range is smaller.
    var fallback = Number(defaultValue);
    if (minimum !== undefined) { fallback = Math.max(fallback, minimum); }
    if (maximum !== undefined) { fallback = Math.min(fallback, maximum); }
    while (true) {
        var input = prompt(message, String(fallback));
        if (input === null || input.trim() === '') { return fallback; }
        var number = Number(input);
        var valid = Number.isFinite(number);
        if (minimum !== undefined && number < minimum) { valid = false; }
        if (maximum !== undefined && number > maximum) { valid = false; }
        if (integerOnly && !Number.isInteger(number)) { valid = false; }
        if (valid) { return number; }
        alert('Please enter a valid ' + (integerOnly ? 'whole number' : 'number') + ' in the requested range.');
    }
}
