// Chapters 1 — Question 5
// Generate a message using the developer console

var message = "Hello... I can run JS through my web browser's console";
console.log(message);
alert(message);
writeLine('Open Developer Tools (F12), select Console, and execute the command below to reproduce the console exercise.');
writeLine('alert(' + JSON.stringify(message) + ');');
