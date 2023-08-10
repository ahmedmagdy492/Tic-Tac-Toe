function Player(player_name, player_symbol) {
    let name = player_name;
    let symbol = player_symbol;

    this.setPlayerName = function(player_name) {
        name = player_name;
    }

    this.setPlayerSymbol = function(player_symbol) {
        symbol = player_symbol;
    }

    this.getPlayerName = function() {
        return name;
    }

    this.getPlayerSymbol = function() {
        return symbol;
    }
}