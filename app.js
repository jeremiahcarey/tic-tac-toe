

const gameBoard = (() => {
    const boardArray = [null, null, null,
        null, "O", null,
        null, null, null];

    return { boardArray };
})();

const Player = (name, symbol) => {
    let getName = () => name;
    let getSymbol = () => symbol;
    return { getName, getSymbol };

}

const playerOne = Player("Player One", "X");
const playerTwo = Player("Player Two", "O");

let currentPlayer = playerOne;




const gameControl = (() => {
    const gameSquares = document.querySelectorAll(".game-square");
    const updateGameDisplay = () => {
        gameBoard.boardArray.forEach((square, index) => {
            if (square) {
                gameSquares[index].children[0].innerText = `${square}`;
            }
        })
    };
    const playerSwitch = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    };
    const gamePlay = () => {
        gameSquares.forEach((square) => {
            square.addEventListener("click", function (e) {
                if (e.target.classList.contains("game-square") && !gameBoard.boardArray[e.target.dataset.index]) {
                    e.target.children[0].innerText = `${currentPlayer.getSymbol()}`;
                    gameBoard.boardArray[e.target.dataset.index] = `${currentPlayer.getSymbol()}`;
                    updateGameDisplay();
                    playerSwitch();
                };
            });
        });
    };

    return { gameSquares, updateGameDisplay, gamePlay }
})();




gameControl.updateGameDisplay();
gameControl.gamePlay();



