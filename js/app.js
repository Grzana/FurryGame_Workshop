
var Game = require('./game.js');


var game = new Game(); //wywołanie nowej gry

game.showFurry(); // wywołanie furry na początku gry
game.showCoin(); // wywołanie randomowe monety na początku gry
game.startGame(); //wywołanie startu gry

document.getElementById('reload').addEventListener('click', function () {
    location.reload();
});

document.addEventListener('keydown', function (event) {
    return game.turnFurry(event.which);
});





