function UI() {
    let buttonHandler = function() {}

    this.askForPlayerNames = function(mode) {
        const playerNames = [];
        let player1Name = "", player2Name = "";

        if(mode === 'player') {
            while(!player1Name || !player2Name)
            {
                player1Name = prompt("What is your name?");
                player2Name = prompt("What is the other player name?");
            }
        }
        else {
            while(!player1Name)
            {
                player1Name = prompt("What is your name?");
            }
            player2Name = "Computer";
        }

        playerNames.push(player1Name);
        playerNames.push(player2Name);

        return playerNames;
    }

    this.setGameModeUI = function(mode) {
        if(mode == 'player') {
            document.querySelector('#game-mode-ui').innerHTML = 'Vs Player';
        }
        else {
            document.querySelector('#game-mode-ui').innerHTML = 'Vs Computer';
        }
    }

    this.askForUserSymbols = function(mode) {
        const playersSymbols = [];

        let player1Symbol = "", player2Symbol = "";

        if(mode === 'player') {
            while(!player1Symbol || !player2Symbol) {
                player1Symbol = prompt("What is the first player symbol?")
                player2Symbol = prompt("What is the other player symbol?");
            }
        }
        else {
            while(!player1Symbol) {
                player1Symbol = prompt("What is the first player symbol?")
            }

            player2Symbol = player1Symbol.toLowerCase() == 'x' ? 'o' : 'x';
        }

        playersSymbols.push(player1Symbol);
        playersSymbols.push(player2Symbol);

        return playersSymbols;
    }

    this.showMessage = function(msg) {
        alert(msg);
    }

    this.setButtonHandler = function(func) {
        buttonHandler = func;
    }

    this.createUI = function() {
        const buttonsCount = 9;
        const parent = document.querySelector('#game-screen');

        for(let i = 0; i < buttonsCount; i++) {
            let btn = document.createElement('button');
            btn.innerText = "-";
            btn.disabled = true;
            btn.onclick = function(e) {
                let row = parseInt([...parent.children].indexOf(btn)/3);
                let col = parseInt([...parent.children].indexOf(btn)%3);
                buttonHandler(row, col, btn);
            };
            if(i === 6 || i === 7 || i === 8) {
                btn.style.borderBottom = 'none';
            }
            if(i === 2 || i === 5 || i === 8) {
                btn.style.borderRight = 'none';
            }
            parent.appendChild(btn);
        }
    }

    this.setPlayerTurn = function(playerName) {
        const playerTurnEl = document.querySelector('#player-turn');
        playerTurnEl.innerText = playerName;
    }

    this.setGameState = function(str) {
        const gameStateTitle = document.querySelector('#game-state');

        gameStateTitle.innerHTML = str;
        if(str === "End" || str === "Not Playing") {
            gameStateTitle.style.color = "red";
        }
        else {
            gameStateTitle.style.color = "green";
        }
    }

    this.displayPlays = function(plays) {
        let gameButtons = document.querySelector('#game-screen').children;
        
        for(let i = 0; i < gameButtons.length; i++) {
            gameButtons[i].innerText = plays[parseInt(i/3)][parseInt(i%3)];
            if(plays[parseInt(i/3)][parseInt(i%3)] != '-') {
                gameButtons[i].disabled = true;
            }
        }
    }

    this.start = function(playerTurnSymbol) {
        const parent = document.querySelector('#game-screen');

        for(let btn of parent.children) {
            btn.disabled = false;
        }
    }

    this.resetUI = function() {
        const parent = document.querySelector('#game-screen');
        parent.children = null;
        this.createUI();
    }
}