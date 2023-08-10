function Game() {
    // private members
    let gameMode = '';
    let plays = [
        ['-', '-', '-'], 
        ['-', '-', '-'],
        ['-', '-', '-']
    ]; // matrix
    const players = [];
    let playerTurn = new Player("", "");
    let gameState = "Not Playing";

    const ui = new UI();

    let generateRandNumber = function() {
        return Math.floor(Math.random()*9);
    }

    let choosePlayerTurn = function() {
        return 0;
    }

    let checkWrapper = function(obj1, obj2, obj3) {
        if(obj1 === '-' || obj2 === '-' || obj3 == '-')
            return false;

        return obj1 === obj2 && obj1 === obj3 && obj2 === obj3;
    }

    let checkWinPossability = function(plays, turn) {
        const firstRowCheck = checkWrapper(plays[0][0], plays[0][1], plays[0][2]);
        const secondRowCheck = checkWrapper(plays[1][0], plays[1][1], plays[1][2]);
        const thirdRowCheck = checkWrapper(plays[2][0], plays[2][1], plays[2][2]);

        const firstColCheck = checkWrapper(plays[0][0], plays[1][0], plays[2][0]);
        const secondColCheck = checkWrapper(plays[0][1], plays[1][1], plays[2][1]);
        const thirdColCheck = checkWrapper(plays[0][2], plays[1][2], plays[2][2]);

        const rightDiagnolCheck = checkWrapper(plays[0][2], plays[1][1], plays[2][0]);
        const leftDiagnolCheck = checkWrapper(plays[0][0], plays[1][1], plays[2][2]);

        if(firstRowCheck || secondRowCheck || thirdRowCheck || firstColCheck || secondColCheck || thirdColCheck || rightDiagnolCheck || leftDiagnolCheck) {
            if(turn === players[1]) {
                return 10;
            }
            else {
                return -10;
            }
        }
        else {
            return 0;
        }
    }

    let getMaxValue = function(listOfValues) {
        let max = listOfValues[0];

        for(let i = 0; i < listOfValues.length; i++) {
            if(max < listOfValues[i]) {
                max = listOfValues[i];
            }
        }

        return max;
    }

    let getMinValue = function(listOfValues) {
        let min = 20;

        for(let i = 0; i < listOfValues.length; i++) {
            if(min > listOfValues[i]) {
                min = listOfValues[i];
            }
        }

        return min;
    }

    let getLeftEmptyLocations = function(board) {
        let listOfEmptyLocations = [];
        
        for(let i = 0;i < 3; i++) {
            for(let j = 0;j< 3; j++) {
                if(board[i][j] === '-') {
                    listOfEmptyLocations.push({i,j});
                }
            }
        }

        return listOfEmptyLocations;
    }

    let miniMax = function(board, chosenEmptyLocation, isMaximizer) {
        board[chosenEmptyLocation.i][chosenEmptyLocation.j] = isMaximizer ? players[1].getPlayerSymbol() : players[0].getPlayerSymbol();
        let emptyLocations = getLeftEmptyLocations(board);

        if(emptyLocations.length == 0 || checkWinPossability(board, isMaximizer ? players[1] : players[0]) == 10 || checkWinPossability(board, isMaximizer ? players[1] : players[0]) == -10) {
            return checkWinPossability(board, isMaximizer ? players[1] : players[0]);
        }
        
        if(isMaximizer) {
            let evaluationValues = [];

            for(let i = 0; i < emptyLocations.length; i++) {
                evaluationValues.push(miniMax(board, emptyLocations[i], false));
            }

            return getMaxValue(evaluationValues);
        }
        else {
            let evaluationValues = [];

            for(let i = 0; i < emptyLocations.length; i++) {
                evaluationValues.push(miniMax(board, emptyLocations[i], true));
            }

            return getMinValue(evaluationValues);
        }
    }

    let areAllPlaysAreFilled = function() {
        for (let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(plays[i][j] == '-') {
                    return false;
                }
            }
        }

        return true;
    }

    let resetPlay = function() {
        gameState = "Not Playing";
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                plays[i][j] = '-';
            }
        }
        playerTurn = new Player();
        players = [];
        ui.resetUI();
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

    let buttonHandler = function(row, col, btn) {
        plays[row][col] = playerTurn.getPlayerSymbol();
        ui.displayPlays(plays);

        let winValue = checkWinPossability(plays, playerTurn);
        if(winValue != 0) {
            ui.showMessage(`${playerTurn.getPlayerName()} Won`);

            let playAgain = confirm("Do you want to play again?");
            if(playAgain) {
                location.reload();
            }
        }
        else {
            if(areAllPlaysAreFilled()) {
                ui.showMessage("It's a Tie");

                let playAgain = confirm("Do you want to play again?");
                if(playAgain) {
                    location.reload();
                }
            }
            else {
                playerTurn = players[0] == playerTurn ? players[1] : players[0];
                ui.setPlayerTurn(playerTurn.getPlayerName() + ": " + playerTurn.getPlayerSymbol());

                if(gameMode != 'player') {
                    if(playerTurn == players[1]) {
                        // computer turn
                        let emptyLocations = getLeftEmptyLocations(plays);
                        let bestLocation = {i: 0, j: 0};
                        let max = -20;
                        let allOutComes = [];
    
                        for(let i = 0; i < emptyLocations.length; i++) {
                            let result = miniMax(JSON.parse(JSON.stringify(plays)), emptyLocations[i], true);
                            allOutComes.push({result: result, i: emptyLocations[i].i, j: emptyLocations[i].j});
                            if(max < result) {
                                max = result;
                                bestLocation = emptyLocations[i];
                            }
                        }
    
                        console.log(allOutComes);

                        if(gameMode == 'com-easy') {
                            plays[bestLocation.i][bestLocation.j] = playerTurn.getPlayerSymbol();
                            ui.displayPlays(plays);
                        }
                        else if(gameMode == 'com-hard'){
                            let positionToPlay = doesHeHave2InARow(players[0].getPlayerSymbol());
    
                            if(max == 10) {
                                plays[bestLocation.i][bestLocation.j] = playerTurn.getPlayerSymbol();
                                ui.displayPlays(plays);
                            }
                            else if(max != 10 && positionToPlay != null) {
                                plays[positionToPlay.i][positionToPlay.j] = playerTurn.getPlayerSymbol();
                                ui.displayPlays(plays);
                            }
                            else {
                                plays[bestLocation.i][bestLocation.j] = playerTurn.getPlayerSymbol();
                                ui.displayPlays(plays);
                            }
                        }
    
                        let winValue = checkWinPossability(plays, playerTurn);
                        if(winValue != 0) {
                            ui.showMessage(`${playerTurn.getPlayerName()} Won`);
    
                            let playAgain = confirm("Do you want to play again?");
                            if(playAgain) {
                                location.reload();
                            }
                        }
                        else {
                            if(areAllPlaysAreFilled()) {
                                ui.showMessage("It's a Tie");
    
                                let playAgain = confirm("Do you want to play again?");
                                if(playAgain) {
                                    location.reload();
                                }
                            }
                            else {
                                playerTurn = players[0] == playerTurn ? players[1] : players[0];
                                ui.setPlayerTurn(playerTurn.getPlayerName() + ": " + playerTurn.getPlayerSymbol());
                            }
                        }
                    }
                }
            }
        }
    }

    // public members
    this.start = function(mode) {
        ui.createUI();
        let playersNames = ui.askForPlayerNames(mode);
        let playersSymbols = ui.askForUserSymbols(mode);

        gameMode = mode;

        ui.setGameModeUI(gameMode);

        players.push(new Player(playersNames[0], playersSymbols[0]));
        players.push(new Player(playersNames[1], playersSymbols[1]));

        playerTurn = players[choosePlayerTurn()];

        gameState = "Playing";
        ui.setGameState(gameState);
        ui.start();

        ui.setButtonHandler(buttonHandler);

        ui.setPlayerTurn(playerTurn.getPlayerName() + ": " + playerTurn.getPlayerSymbol());
    }
}
