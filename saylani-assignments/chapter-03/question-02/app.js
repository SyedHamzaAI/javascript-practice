// Chapters 3 — Question 2
// Keep track of page visits

var visits = 1;
try {
    var previousVisits = Number(localStorage.getItem('saylani-chapter03-visits')) || 0;
    visits = previousVisits + 1;
    localStorage.setItem('saylani-chapter03-visits', String(visits));
} catch (error) {
    // Some browsers disable storage for local files or private browsing.
    writeLine('Storage is unavailable; this visit is counted for the current page only.');
}
writeLine('You have visited this site ' + visits + ' times.');
