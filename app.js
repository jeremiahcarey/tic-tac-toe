const gameSquares = document.querySelectorAll(".game-square");

gameSquares.forEach((square) => {
    square.addEventListener("click", function (e) {
        e.target.children[0].innerText = "O";
    });
});