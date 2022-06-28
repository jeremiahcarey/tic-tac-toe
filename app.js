

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



const gameControl = (() => {
    const gameSquares = document.querySelectorAll(".game-square");
    const updateGameDisplay = () => {
        gameBoard.boardArray.forEach((square, index) => {
            if (square) {
                gameSquares[index].children[0].innerText = `${square}`;
            }
        })
    };
    const gamePlay = () => {
        gameSquares.forEach((square) => {
            square.addEventListener("click", function (e) {
                e.target.children[0].innerText = `${currentPlayer.getSymbol()}`;
                gameBoard.boardArray[e.target.dataset.index] = `${currentPlayer.getSymbol()}`;
                updateGameDisplay();
                if (currentPlayer = playerOne) {
                    let currentPlayer = playerTwo;
                } else {
                    let currentPlayer = playerOne;
                };
            });
        });
    }

    return { gameSquares, updateGameDisplay, gamePlay }
})();

const playerOne = Player("Player One", "X");
const playerTwo = Player("Player Two", "O");
let currentPlayer = playerTwo;
gameControl.updateGameDisplay();
gameControl.gamePlay();



