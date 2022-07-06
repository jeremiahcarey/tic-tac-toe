const twoPlayerBtn = document.querySelector("#two-player-btn");
const aiEasyBtn = document.querySelector("#ai-btn-easy");
const aiHardBtn = document.querySelector("#ai-btn-hard");
const controlContentDiv = document.querySelector(".control-content");
const controlContentDefault = document.querySelector(".control-content").innerHTML;
const twoPlayerFormHTML = `<form id="two-player-names" action="action = " javascript:void(0);" >
<div>
    <label for="player-one-name">Player one name?</label>
    <input class="input" type="text" id="player-one-name" name="player-one-name" required>
</div>
<div>
    <label for="player-two-name">Player two name?</label>
    <input class="input" type="text" id="player-two-name" name="player-two-name" required>
</div>
<button id="two-player-start-btn" type="submit">Start Play</button>
</form >`
const twoPlayerForm = document.querySelector("#two-player-names");
const playerOneInput = document.querySelector("#player-one-name");
const playerTwoInput = document.querySelector("#player-two-name");


// twoPlayerBtn.addEventListener("click", ()=> {

// })

let playerOne;
let playerTWo;
let currentPlayer;


const gameBoard = (() => {
    // gameboard info
    const boardArray = [null, null, null,
        null, null, null,
        null, null, null];
    const possibleWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    // menu controls


    return { boardArray, possibleWins };
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
    const playerSwitch = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    };
    const checkForWin = (currentPlays) => {
        for (const possibility of gameBoard.possibleWins) {
            if (possibility.every(squareIndex => { return currentPlays.includes(squareIndex) })) {
                console.log(`${currentPlayer.getName()} wins!`);
                for (const squareIndex of possibility) {
                    gameSquares[squareIndex].classList.add("winning-square");
                }
                gameSquares.forEach(square => {
                    square.classList.add("no-hover");
                });
            } else if (gameBoard.boardArray.every(space => space !== null)) {
                gameSquares.forEach(square => {
                    square.classList.add("squares-tied");
                    square.classList.add("no-hover");
                })
            }
        }
    }
    const gamePlay = () => {
        gameSquares.forEach((square) => {
            square.addEventListener("click", function (e) {
                if (e.target.classList.contains("game-square") && !gameBoard.boardArray[e.target.dataset.index]) {
                    e.target.children[0].innerText = `${currentPlayer.getSymbol()}`;
                    gameBoard.boardArray[e.target.dataset.index] = `${currentPlayer.getSymbol()}`;
                    const currentPlays = gameBoard.boardArray.map((square, index) => {
                        if (square === `${currentPlayer.getSymbol()}`) {
                            return index;
                        }
                    }).filter(square => square >= 0);
                    checkForWin(currentPlays);
                    updateGameDisplay();
                    playerSwitch();
                };
            });
        });
    };

    return { gameSquares, updateGameDisplay, gamePlay }
})();


twoPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const playerOneName = playerOneInput.value;
    const playerTwoName = playerTwoInput.value;
    playerOne = Player(playerOneName, "X");
    playerTwo = Player(playerTwoName, "O");
    currentPlayer = playerOne;
    controlContentDiv.innerHTML = "";
    gameControl.gamePlay();
})