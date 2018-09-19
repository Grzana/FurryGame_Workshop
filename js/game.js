var Coin = require('./coin.js');
var Furry = require('./furry.js');

function Game() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.board = document.getElementById('board').querySelectorAll('div'); // tablica ze wszystkimi polami (index od 0 do 99)
    this.score = 0; // punkty gracza
    this.index = function (x, y) { // obliczenie pozycji potrzebnej do indexu w tablicy
        return x + (y * 10);
    };

    this.showFurry = function () {
        if (this.board[this.index(this.furry.x, this.furry.y)] != undefined) {
            return this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        }
    }; // obliczenie pozycji furry (przypisanie klasy)

    this.showCoin = function () {
        return this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }; // obliczenie pozycji monety (przypisanie klasy)
    var self = this;
    this.moveFurry = function () {
        this.hideVisibleFurry();
        if (this.furry.direction === 'right') {
            self.furry.x += 1;
        }
        else if (this.furry.direction === 'left') {
            self.furry.x -= 1;
        }
        else if (this.furry.direction === 'up') {
            self.furry.y -= 1;
        }
        else if (this.furry.direction === 'down') {
            self.furry.y += 1;
        }
        this.showFurry();
        this.gameOver();
        this.checkCoinCollision();
    }

    this.hideVisibleFurry = function () {
        var toRemove = document.querySelector('.furry');
        if (toRemove != null) {
            toRemove.classList.remove('furry');
        }
    }

    this.turnFurry = function (key) {
        switch (key) {
            case 37:
                self.furry.direction = 'left';
                break;
            case 38:
                self.furry.direction = 'up';
                break;
            case 39:
                self.furry.direction = 'right';
                break;
            case 40:
                self.furry.direction = 'down';
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.board[this.index(this.furry.x, this.furry.y)] === this.board[this.index(this.coin.x, this.coin.y)]) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score += 1;
            document.querySelector('strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 ||
            this.furry.x > 9 ||
            this.furry.y < 0 ||
            this.furry.y > 9
        ) {
            this.hideVisibleFurry();
            this.defeat();
            return clearInterval(self.idSetInterval);

        }
    };

    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
    this.defeat = function () {
        document.getElementById('over').classList.remove('invisible');
        document.getElementById('over').classList.add('nice_display');
        document.getElementById('final_score').innerText = 'YOUR SCORE IS ONLY: ' + this.score;
    }
}

module.exports = Game;