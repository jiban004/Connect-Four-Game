const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');

function createBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    gameBoard.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const col = event.target.dataset.col;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                message.textContent = `${currentPlayer.toUpperCase()} wins!`;
                gameBoard.removeEventListener('click', handleCellClick, true);
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            return;
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

function checkDirection(row, col, rowDelta, colDelta) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const newRow = row + i * rowDelta;
        const newCol = col + i * colDelta;
        if (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLS &&
            board[newRow][newCol] === currentPlayer
        ) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

resetButton.addEventListener('click', () => {
    createBoard();
    currentPlayer = 'red';
    message.textContent = '';
});

createBoard();
