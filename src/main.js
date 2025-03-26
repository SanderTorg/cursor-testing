import "./style.css";

// Game state
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// DOM elements
const cells = document.querySelectorAll(".cell");
const currentPlayerDisplay = document.getElementById("current-player");
const resetButton = document.getElementById("reset-button");

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute("data-cell-index"));

  if (gameBoard[cellIndex] !== "" || !gameActive) return;

  updateCell(cell, cellIndex);
  checkWinner();
}

// Update cell
function updateCell(cell, index) {
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
}

// Check for winner
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const position1 = gameBoard[a];
    const position2 = gameBoard[b];
    const position3 = gameBoard[c];

    if (position1 === "" || position2 === "" || position3 === "") continue;
    if (position1 === position2 && position2 === position3) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    alert(`Player ${currentPlayer} has won!`);
    gameActive = false;
    return;
  }

  const roundDraw = !gameBoard.includes("");
  if (roundDraw) {
    alert("Game ended in a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerDisplay.textContent = currentPlayer;
}

// Reset game
function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayerDisplay.textContent = currentPlayer;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

// Event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
