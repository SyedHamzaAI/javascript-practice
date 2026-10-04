// Chapters 1 — Question 7
// Practice all four script placements

// The four inline scripts in index.html record their actual parser order.
for (var i = 0; i < scriptPositions.length; i++) {
    writeLine((i + 1) + '. ' + scriptPositions[i]);
}
writeLine('The head script runs before page elements exist. The final script can access the rendered page.');
