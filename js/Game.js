function Game() {
    // private members
    const ai = new AI();
    const ui = new UI();
    let gameMode = '';
    let plays = [
        ['-', '-', '-'], 
        ['-', '-', '-'],
        ['-', '-', '-']
    ]; // matrix
    const players = [];
    let playerTurn = null;
    let gameState = "Not Playing";

    let choosePlayerTurn = function() {
        return 0;
    }

    let doesHeHave2InARow = function(playerSymbol) {
        if(plays[0][0] == playerSymbol && plays[0][1] == playerSymbol && plays[0][2] == '-') {
            return {i: 0, j: 2};
        }
        else if(plays[0][1] == playerSymbol && plays[0][2] == playerSymbol && plays[0][0] == '-') {
            return {i: 0, j: 0};
        }
        else if(plays[0][0] == playerSymbol && plays[0][2] == playerSymbol && plays[0][1] == '-') {
            return {i: 0, j: 1};
        }
        else if(plays[1][0] == playerSymbol && plays[1][1] == playerSymbol && plays[1][2] == '-') {
            return {i: 1, j: 2};
        }
        else if(plays[1][1] == playerSymbol && plays[1][2] == playerSymbol && plays[1][0] == '-') {
            return {i: 1, j: 0};
        }
        else if(plays[1][0] == playerSymbol && plays[1][2] == playerSymbol && plays[1][1] == '-') {
            return {i: 1, j: 1};
        }
        else if(plays[2][0] == playerSymbol && plays[2][1] == playerSymbol && plays[2][2] == '-') {
            return {i: 2, j: 2};
        }
        else if(plays[2][1] == playerSymbol && plays[2][2] == playerSymbol && plays[2][0] == '-') {
            return {i: 2, j: 0};
        }
        else if(plays[2][0] == playerSymbol && plays[2][2] == playerSymbol && plays[2][1] == '-') {
            return {i: 2, j: 1};
        }
        else if(plays[0][0] == playerSymbol && plays[1][0] == playerSymbol && plays[2][0] == '-') {
            return {i: 2, j: 0};
        }
        else if(plays[0][0] == playerSymbol && plays[1][0] == '-' && plays[2][0] == playerSymbol) {
            return {i: 1, j: 0};
        }
        else if(plays[0][0] == '-' && plays[1][0] == playerSymbol && plays[2][0] == playerSymbol) {
            return {i: 0, j: 0};
        }
        else if(plays[0][1] == playerSymbol && plays[1][1] == playerSymbol && plays[2][1] == '-') {
            return {i: 2, j: 1};
        }
        else if(plays[0][1] == playerSymbol && plays[1][1] == '-' && plays[2][1] == playerSymbol) {
            return {i: 1, j: 1};
        }
        else if(plays[0][1] == '-' && plays[1][1] == playerSymbol && plays[2][1] == playerSymbol) {
            return {i: 0, j: 1};
        }
        else if(plays[0][2] == playerSymbol && plays[1][2] == playerSymbol && plays[2][2] == '-') {
            return {i: 2, j: 2};
        }
        else if(plays[0][2] == playerSymbol && plays[1][2] == '-' && plays[2][2] == playerSymbol) {
            return {i: 1, j: 2};
        }
        else if(plays[0][2] == '-' && plays[1][2] == playerSymbol && plays[2][2] == playerSymbol) {
            return {i: 0, j: 2};
        }
        else if(plays[0][0] == playerSymbol && plays[1][1] == playerSymbol && plays[2][2] == '-') {
            return {i: 2, j: 2};
        }
        else if(plays[0][0] == playerSymbol && plays[1][1] == '-' && plays[2][2] == playerSymbol) {
            return {i: 1, j: 1};
        }
        else if(plays[0][0] == '-' && plays[1][1] == playerSymbol && plays[2][2] == playerSymbol) {
            return {i: 0, j: 0};
        }
        else if(plays[0][2] == playerSymbol && plays[1][1] == playerSymbol && plays[2][0] == '-') {
            return {i: 2, j: 0};
        }
        else if(plays[0][2] == playerSymbol && plays[1][1] == '-' && plays[2][0] == playerSymbol) {
            return {i: 1, j: 1};
        }
        else if(plays[0][2] == '-' && plays[1][1] == playerSymbol && plays[2][0] == playerSymbol) {
            return {i: 0, j: 2};
        }

        return null;
    }

    let buttonClickHandler = function(row, col, btn) {
        // human turn
        plays[row][col] = playerTurn.getPlayerSymbol();
        ui.displayPlays(plays);

        // checking has someone won
        let winValue = Util.checkWinPossability(plays, players);
        if(winValue != null && winValue != 'tie') {
            ui.showMessage(`${winValue} Won`);

            let playAgain = confirm("Do you want to play again?");
            if(playAgain) {
                location.reload();
            }
            return;
        }
        else if(winValue == 'tie') {
            ui.showMessage("It's a Tie");

            let playAgain = confirm("Do you want to play again?");
            if(playAgain) {
                location.reload();
            }
            return;
        }

        // changing the turn
        playerTurn = players[0] == playerTurn ? players[1] : players[0];
        ui.setPlayerTurn(playerTurn.getPlayerName() + ": " + playerTurn.getPlayerSymbol());

        // computer turn
        ai.playBestMove(plays, players);
        ui.displayPlays(plays);

        // changing the turn again
        playerTurn = players[0] == playerTurn ? players[1] : players[0];
        ui.setPlayerTurn(playerTurn.getPlayerName() + ": " + playerTurn.getPlayerSymbol());
    }

    // public members
    this.start = function(mode) {
        ui.createUI();
        let playersNames = ui.askForPlayerNames(mode);

        gameMode = mode;

        ui.setGameModeUI(gameMode);

        players.push(new Player(playersNames[0], 'x'));
        players.push(new Player(playersNames[1], 'o'));

        playerTurn = players[choosePlayerTurn()];

        gameState = "Playing";
        ui.setGameState(gameState);
        ui.start();

        ui.setButtonHandler(buttonClickHandler);

        ui.setPlayerTurn(playerTurn.getPlayerName() + ": " + playerTurn.getPlayerSymbol());
    }
}