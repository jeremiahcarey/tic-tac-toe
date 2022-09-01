
const gameBoard = (() => {
    const boardArray = [null, null, null,
        null, null, null,
        null, null, null];
    const possibleWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    return { boardArray, possibleWins, };
})();


const Player = (name, symbol) => {
    let getName = () => name;
    let getSymbol = () => symbol;
    return { getName, getSymbol };
};


const gameControl = (() => {
    let playerOne;
    let playerTwo
    let currentPlayer;
    const gameSquares = document.querySelectorAll(".game-square");
    const announcements = document.querySelector(".announcements");
    const playSelectMenu = document.querySelector(".play-select-menu")
    const twoPlayerBtn = document.querySelector("#two-player-btn");
    const onePlayerEasyBtn = document.querySelector("#computer-easy-btn");
    const onePlayerHardBtn = document.querySelector("#computer-hard-btn");
    const twoPlayerFormDiv = document.querySelector(".two-player-form");
    const onePlayerEasyFormDiv = document.querySelector(".against-computer-form-easy");
    const twoPlayerForm = document.querySelector("#two-player-names");
    const onePlayerEasyForm = document.querySelector("#one-player-easy-name");
    const onePlayerHardForm = document.querySelector("#one-player-hard-name");
    const onePlayerHardFormDiv = document.querySelector(".against-computer-form-hard");
    const playerOneInput = document.querySelector("#player-one-name");
    const playerTwoInput = document.querySelector("#player-two-name");
    const playerEasyInput = document.querySelector("#player-name-easy");
    const playerHardInput = document.querySelector("#player-name-hard");

    const updateGameDisplay = () => {
        gameBoard.boardArray.forEach((square, index) => {
            if (square) {
                gameSquares[index].children[0].innerText = `${square}`;
            }
        })
    };
    const clearBoard = () => {
        gameBoard.boardArray = [null, null, null,
            null, null, null,
            null, null, null];
        gameSquares.forEach((square) => {
            square.children[0].innerText = "";
            square.classList.remove("winning-square");
            square.classList.remove("squares-tied");
        });
    }
    const playerSwitch = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    };
    const eventListeners = () => {
        twoPlayerBtn.addEventListener("click", () => {
            playSelectMenu.style.display = "none";
            twoPlayerFormDiv.style.display = "block";
        });
        twoPlayerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const playerOneName = playerOneInput.value;
            const playerTwoName = playerTwoInput.value;
            const firstPlayer = Player(playerOneName, "X");
            const secondPlayer = Player(playerTwoName, "O");
            playerOne = firstPlayer;
            playerTwo = secondPlayer;
            twoPlayerForm.reset();
            currentPlayer = playerOne;
            gameSquares.forEach((square) => {
                square.classList.remove("no-hover");
            });
            announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
            gamePlayTwoPlayer();
        });
        onePlayerEasyBtn.addEventListener("click", () => {
            playSelectMenu.style.display = "none";
            onePlayerEasyFormDiv.style.display = "block";
        });
        onePlayerEasyForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const playerOneName = playerEasyInput.value;
            const playerTwoName = "Computer"
            const firstPlayer = Player(playerOneName, "X");
            const secondPlayer = Player(playerTwoName, "O");
            playerOne = firstPlayer;
            playerTwo = secondPlayer;
            onePlayerEasyForm.reset();
            currentPlayer = playerOne;
            gameSquares.forEach((square) => {
                square.classList.remove("no-hover");
            });
            announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
            gamePlayOnePlayerEasy();
        });
        onePlayerHardBtn.addEventListener("click", () => {
            playSelectMenu.style.display = "none";
            onePlayerHardFormDiv.style.display = "block";
        })
        onePlayerHardForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const playerOneName = playerHardInput.value;
            const playerTwoName = "Computer"
            const firstPlayer = Player(playerOneName, "X");
            const secondPlayer = Player(playerTwoName, "O");
            playerOne = firstPlayer;
            playerTwo = secondPlayer;
            onePlayerHardForm.reset();
            currentPlayer = playerOne;
            gameSquares.forEach((square) => {
                square.classList.remove("no-hover");
            });
            announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
            gamePlayOnePlayerHard();
        })
    };

    const announceWin = () => {
        const currentPlays = gameBoard.boardArray.map((square, index) => {
            if (square === currentPlayer.getSymbol()) {
                return index;
            }
        });
        for (const possibility of gameBoard.possibleWins) {
            if (possibility.every(squareIndex => { return currentPlays.includes(squareIndex) })) {
                for (const squareIndex of possibility) {
                    gameSquares[squareIndex].classList.add("winning-square");
                }
            }
        };
        gameSquares.forEach(square => {
            square.classList.add("no-hover");
        });
        announcements.innerHTML = `
    <h1>${currentPlayer.getName()} wins!</h1>
    <button type="button" id="play-again-btn">Play Again</button>
    `;
        document.querySelector("#play-again-btn").addEventListener("click", () => {
            clearBoard();
            announcements.style.display = "none";
            playSelectMenu.style.display = "block";
        })
    };

    const announceDraw = () => {
        gameSquares.forEach(square => {
            square.classList.add("squares-tied");
            square.classList.add("no-hover");
        })
        announcements.innerHTML = `
                <h1>It's a draw!</h1>
                <button type="button" id="play-again-btn">Play Again</button>
                `;
        document.querySelector("#play-again-btn").addEventListener("click", () => {
            clearBoard();
            announcements.style.display = "none";
            playSelectMenu.style.display = "block";
        })
    }

    const checkForWin = (boardState, player) => {
        const playerPlays = [];
        boardState.forEach((element, index) => {
            if (element === player.getSymbol()) {
                playerPlays.push(index);
            }
        });
        for (const possibility of gameBoard.possibleWins) {
            if (possibility.every(squareIndex => { return playerPlays.includes(squareIndex) })) {
                return true;
            };
        }
    }

    const checkForDraw = (boardState) => {
        if (boardState.every(space => space !== null)) {
            return true;
        }
    }

    const minimax = (board, player) => {
        if (checkForWin(board, playerTwo)) {
            return { score: 10 };
        } else if (checkForWin(board, playerOne)) {
            return { score: -10 };
        } else if (checkForDraw(board)) {
            return { score: 0 };
        }

        let allMoves = [];
        for (let i = 0; i < board.length; i++) {
            let currentMove = {};
            if (board[i] === null) {
                currentMove.index = i;
                board[i] = player.getSymbol();

                if (player === playerTwo) {
                    let result = minimax(board, playerOne);
                    currentMove.score = result.score;
                } else {
                    let result = minimax(board, playerTwo);
                    currentMove.score = result.score;
                }

                board[i] = null;

                allMoves.push(currentMove);
            }
        }

        let bestMove;
        if (player === playerTwo) {
            let bestScore = -Infinity;
            for (let i = 0; i < allMoves.length; i++) {
                if (allMoves[i].score > bestScore) {
                    bestScore = allMoves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < allMoves.length; i++) {
                if (allMoves[i].score < bestScore) {
                    bestScore = allMoves[i].score;
                    bestMove = i;
                }
            }
        }
        return allMoves[bestMove];
    }

    const bestSpot = () => {
        return minimax(gameBoard.boardArray, playerTwo).index;
    }


    const playerPlayVComputerEasy = (e) => {
        if (e.target.classList.contains("game-square") && currentPlayer.getName() !== "Computer" && !gameBoard.boardArray[e.target.dataset.index]) {
            e.target.children[0].innerText = currentPlayer.getSymbol();
            gameBoard.boardArray[e.target.dataset.index] = `${currentPlayer.getSymbol()}`;
            updateGameDisplay();
            if (checkForWin(gameBoard.boardArray, currentPlayer)) {
                announceWin();
                gameSquares.forEach((square) => {
                    square.removeEventListener("click", playerPlayVComputerEasy);
                });
                return;
            } else if (checkForDraw(gameBoard.boardArray)) {
                announceDraw();
                gameSquares.forEach((square) => {
                    square.removeEventListener("click", playerPlayVComputerEasy);
                });
                return;
            }
            playerSwitch();
            announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
            setTimeout(computerTurnEasy, 550);
        };
    }

    const playerPlayVComputerHard = (e) => {
        if (e.target.classList.contains("game-square") && currentPlayer.getName() !== "Computer" && !gameBoard.boardArray[e.target.dataset.index]) {
            e.target.children[0].innerText = currentPlayer.getSymbol();
            gameBoard.boardArray[e.target.dataset.index] = `${currentPlayer.getSymbol()}`;
            updateGameDisplay();
            if (checkForWin(gameBoard.boardArray, currentPlayer)) {
                announceWin();
                gameSquares.forEach((square) => {
                    square.removeEventListener("click", playerPlayVComputerHard);
                });
                return;
            } else if (checkForDraw(gameBoard.boardArray)) {
                announceDraw();
                gameSquares.forEach((square) => {
                    square.removeEventListener("click", playerPlayVComputerHard);
                });
                return;
            }
            playerSwitch();
            announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
            setTimeout(computerTurnHard, 550);
        };
    }

    const playerPlayTwoPlayer = (e) => {
        if (e.target.classList.contains("game-square") && !gameBoard.boardArray[e.target.dataset.index]) {
            e.target.children[0].innerText = currentPlayer.getSymbol();
            gameBoard.boardArray[e.target.dataset.index] = currentPlayer.getSymbol();
            updateGameDisplay();
            if (checkForWin(gameBoard.boardArray, currentPlayer)) {
                announceWin();
                gameSquares.forEach((square) => {
                    square.removeEventListener("click", playerPlayTwoPlayer);
                });
                return;
            } else if (checkForDraw(gameBoard.boardArray)) {
                announceDraw();
                gameSquares.forEach((square) => {
                    square.removeEventListener("click", playerPlayTwoPlayer);
                });
                return;
            }
            playerSwitch();
            announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
        }
    };

    const computerTurnEasy = () => {
        function randPlay() {
            return Math.floor(Math.random() * 9)
        }
        let computerPlay
        do {
            computerPlay = randPlay();
        } while (gameBoard.boardArray[computerPlay] != null)
        gameBoard.boardArray[computerPlay] = currentPlayer.getSymbol();
        updateGameDisplay();
        if (checkForWin(gameBoard.boardArray, currentPlayer)) {
            announceWin();
            gameSquares.forEach((square) => {
                square.removeEventListener("click", playerPlayVComputerEasy);
            });
            return;
        } else if (checkForDraw(gameBoard.boardArray)) {
            announceDraw();
            gameSquares.forEach((square) => {
                square.removeEventListener("click", playerPlayVComputerEasy);
            });
            return;
        }
        playerSwitch();
        announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
    };

    const computerTurnHard = () => {
        const moveIndex = bestSpot();
        gameBoard.boardArray[moveIndex] = currentPlayer.getSymbol();
        updateGameDisplay();
        if (checkForWin(gameBoard.boardArray, currentPlayer)) {
            announceWin();
            gameSquares.forEach((square) => {
                square.removeEventListener("click", playerPlayVComputerHard);
            });
            return;
        } else if (checkForDraw(gameBoard.boardArray)) {
            announceDraw();
            gameSquares.forEach((square) => {
                square.removeEventListener("click", playerPlayVComputerHard);
            });
            return;
        }
        playerSwitch();
        announcements.innerHTML = `<h1>${currentPlayer.getName()}'s turn</h1>`;
    }

    const gamePlayTwoPlayer = () => {
        twoPlayerFormDiv.style.display = "none";
        announcements.style.display = "block";
        gameSquares.forEach((square) => {
            square.addEventListener("click", playerPlayTwoPlayer)
        });
    };


    const gamePlayOnePlayerEasy = () => {
        onePlayerEasyFormDiv.style.display = "none";
        announcements.style.display = "block";
        gameSquares.forEach((square) => {
            square.addEventListener("click", playerPlayVComputerEasy);
        });
    };

    const gamePlayOnePlayerHard = () => {
        onePlayerHardFormDiv.style.display = "none";
        announcements.style.display = "block";
        gameSquares.forEach((square) => {
            square.addEventListener("click", playerPlayVComputerHard);
        });
    }



    return { eventListeners }
})();


gameControl.eventListeners();



