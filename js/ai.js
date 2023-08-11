const  AI = function() {
    const human = 'x';
    const ai = 'o';

    const scores = {
        x: -1,
        o: 1,
        "tie": 0
    };

    const evaluation = function(winner) {
        return scores[winner];
    }

    this.playBestMove = function(board, players) {
        debugger;
        let bestMove = -Infinity;
        let move = {i: 0, j: 0};

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == '-') {
                    board[i][j] = ai;
                    let currentScore = miniMax(board, false, players);
                    board[i][j] = '-';
                    if(bestMove < currentScore) {
                        bestMove = currentScore;
                        move = {i, j};
                    }
                }
            }
        }
        board[move.i][move.j] = ai;
    }

    function miniMax(board, isMaximizer, players) {
        let result = Util.checkWinPossability(board, players);
        if(result != null) {
            return evaluation(result);
        }

        if(isMaximizer) {
            let maxMove = -Infinity;

            for(let i  = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(board[i][j] == '-') {
                        board[i][j] = ai;
                        let currentScore = miniMax(board, false, players);
                        board[i][j] = '-';
                        maxMove = Math.max(maxMove, currentScore);
                    }
                }
            }

            return maxMove;
        }
        else {
            let minValue = Infinity;

            for(let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if(board[i][j] == '-') {
                        board[i][j] = human;
                        let currentValue = miniMax(board, true, players);
                        board[i][j] = '-';
                        minValue = Math.min(minValue, currentValue);
                    }
                }
            }

            return minValue;
        }
    }
}