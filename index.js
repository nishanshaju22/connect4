const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const ROWS = 6;
const COLS = 7;

let currentPlayer = "Red";
options = Array(42).fill("");
let running = false;

let column1 = [35, 28, 21, 14, 7, 0];
let column2 = [36, 29, 22, 15, 8, 1];
let column3 = [37, 30, 23, 16, 9, 2];
let column4 = [38, 31, 24, 17, 10, 3];
let column5 = [39, 32, 25, 18, 11, 4];
let column6 = [40, 33, 26, 19, 12, 5];
let column7 = [41, 34, 27, 20, 13, 6];

const columns = {
    column1,
    column2,
    column3,
    column4,
    column5,
    column6,
    column7
};

initGame();

function initGame() {
    running = true;
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClicked() {
    if (!running) return;

    const column = this.getAttribute("column");
    let newCol = columns[column];

    let colFull = true;

    for (let val of newCol) {
        if (options[val] === "") {
            updateCell(val);
            checkWinner();
            colFull = false
            break
        }
    }

    if (colFull) {
        statusText.textContent = `Place in diffrent column, current column is full`;
    }

}

function updateCell(index) {
    const cell = document.querySelector(`.cell[cell="${index}"]`);

    if (cell.classList.contains("Red") || cell.classList.contains("Yellow")) {
      return;
    }

    cell.classList.add(currentPlayer.toLowerCase());
    options[index] = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "Red" ? "Yellow" : "Red";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < options.length; i++) {
        if (options[i] === "") continue;

        const player = options[i];

        if (checkDirection(i, 1, 0, player) || checkDirection(i, 0, 1, player) || checkDirection(i, 1, 1, player) || checkDirection(i, 1, -1, player)) {
            statusText.textContent = `${player} WINS!`;
            running = false;
            return;
        }
    }

    if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function checkDirection(startIndex, colStep, rowStep, player) {
    let count = 0;

    let col = startIndex % COLS;
    let row = Math.floor(startIndex / COLS);

    while (col >= 0 && col < COLS && row >= 0 && row < ROWS && options[row * COLS + col] === player) {
        count++;
        if (count === 4) return true;

        col += colStep;
        row += rowStep;
    }

    return false;
}

function restartGame() {
    currentPlayer = "Red";
    options = Array(42).fill("");
    statusText.textContent = `${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.classList.remove("red", "yellow");
    });

    running = true;
}