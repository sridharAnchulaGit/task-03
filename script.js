const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.querySelector('.current-player');
const resetButton = document.querySelector('.reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-cell');
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
            return;
        }
    }

    if (!gameBoard.includes('')) {
        alert("It's a tie!");
        resetGame();
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = currentPlayer;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', handleCellClick);
    cell.setAttribute('data-cell', index);
});

resetButton.addEventListener('click', resetGame);
