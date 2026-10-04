var searchInput = document.getElementById('chapter-search');
var cards = document.querySelectorAll('.chapter-card');
searchInput.addEventListener('input', function () {
    var query = this.value.trim().toLowerCase();
    var visible = 0;
    for (var i = 0; i < cards.length; i++) {
        var match = cards[i].dataset.search.includes(query);
        cards[i].hidden = !match;
        if (match) { visible++; }
    }
    document.getElementById('visible-count').textContent = visible + ' chapter group' + (visible === 1 ? '' : 's');
    document.getElementById('empty-results').hidden = visible !== 0;
});
