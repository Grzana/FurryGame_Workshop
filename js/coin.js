// Przygotowanie konstruktora dla monety

function Coin() {
    // ustawienia początkowe dla monety:
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;