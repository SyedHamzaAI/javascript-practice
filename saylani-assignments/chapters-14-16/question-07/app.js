// Chapters 14–16 — Question 7
// List education qualifications in Pakistan

var qualifications = ['SSC', 'HSC', 'BCS', 'BS', 'BCOM', 'MS', 'M. Phil.', 'PhD'];
writeHeading('Qualifications');
for (var i = 0; i < qualifications.length; i++) {
    writeLine((i + 1) + ') ' + qualifications[i]);
}
