import "./style.css";

// Tic Tac Toe Game Logic
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// DOM elements for Tic Tac Toe
const cells = document.querySelectorAll(".cell");
const currentPlayerDisplay = document.getElementById("current-player");
const resetButton = document.getElementById("reset-button");

// Winning combinations for Tic Tac Toe
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

// Chess Game Logic
let chessCurrentPlayer = "white";
let selectedPiece = null;
let validMoves = [];

const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

let chessBoard = JSON.parse(JSON.stringify(initialBoard));

// DOM elements for Chess
const chessBoardElement = document.querySelector(".chess-board");
const chessPlayerDisplay = document.getElementById("chess-player");
const chessResetButton = document.getElementById("chess-reset");

// Initialize chess board
function initializeChessBoard() {
  chessBoardElement.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = `chess-square ${
        (row + col) % 2 === 0 ? "light" : "dark"
      }`;
      square.dataset.row = row;
      square.dataset.col = col;

      if (chessBoard[row][col]) {
        const piece = document.createElement("div");
        piece.className = `chess-piece ${
          isWhitePiece(chessBoard[row][col]) ? "white" : "black"
        }`;
        piece.textContent = chessBoard[row][col];
        square.appendChild(piece);
      }

      square.addEventListener("click", handleChessSquareClick);
      chessBoardElement.appendChild(square);
    }
  }
}

// Check if a piece is white
function isWhitePiece(piece) {
  return ["♔", "♕", "♖", "♗", "♘", "♙"].includes(piece);
}

// Handle chess square click
function handleChessSquareClick(e) {
  const square = e.target.closest(".chess-square");
  if (!square) return;

  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const piece = chessBoard[row][col];

  // Clear previous selection
  clearSelection();

  // If clicking on a piece of the current player's color
  if (piece && isWhitePiece(piece) === (chessCurrentPlayer === "white")) {
    selectedPiece = { row, col };
    square.classList.add("selected");
    showValidMoves(row, col);
  }
  // If clicking on a valid move square
  else if (
    selectedPiece &&
    isValidMove(selectedPiece.row, selectedPiece.col, row, col)
  ) {
    movePiece(selectedPiece.row, selectedPiece.col, row, col);
  }
}

// Clear selection and valid moves
function clearSelection() {
  document.querySelectorAll(".chess-square").forEach((square) => {
    square.classList.remove("selected", "valid-move");
  });
  selectedPiece = null;
  validMoves = [];
}

// Show valid moves for a piece
function showValidMoves(row, col) {
  const piece = chessBoard[row][col];
  const moves = getValidMoves(row, col, piece);

  moves.forEach(([r, c]) => {
    const square = document.querySelector(
      `.chess-square[data-row="${r}"][data-col="${c}"]`
    );
    if (square) {
      square.classList.add("valid-move");
    }
  });
}

// Get valid moves for a piece
function getValidMoves(row, col, piece) {
  const moves = [];
  const isWhite = isWhitePiece(piece);
  const direction = isWhite ? -1 : 1;

  switch (piece) {
    case "♙": // White pawn
    case "♟": // Black pawn
      // Forward move
      if (!chessBoard[row + direction]?.[col]) {
        moves.push([row + direction, col]);
        // First move can be 2 squares
        if ((isWhite && row === 6) || (!isWhite && row === 1)) {
          if (!chessBoard[row + 2 * direction]?.[col]) {
            moves.push([row + 2 * direction, col]);
          }
        }
      }
      // Capture moves
      [-1, 1].forEach((offset) => {
        const targetRow = row + direction;
        const targetCol = col + offset;
        if (
          chessBoard[targetRow]?.[targetCol] &&
          isWhitePiece(chessBoard[targetRow][targetCol]) !== isWhite
        ) {
          moves.push([targetRow, targetCol]);
        }
      });
      break;
    // Add more piece movement logic here
  }

  return moves;
}

// Check if a move is valid
function isValidMove(fromRow, fromCol, toRow, toCol) {
  return validMoves.some(([r, c]) => r === toRow && c === toCol);
}

// Move a piece
function movePiece(fromRow, fromCol, toRow, toCol) {
  chessBoard[toRow][toCol] = chessBoard[fromRow][fromCol];
  chessBoard[fromRow][fromCol] = "";

  // Switch turns
  chessCurrentPlayer = chessCurrentPlayer === "white" ? "black" : "white";
  chessPlayerDisplay.textContent = chessCurrentPlayer;

  // Reinitialize the board
  initializeChessBoard();
}

// Reset chess game
function resetChessGame() {
  chessBoard = JSON.parse(JSON.stringify(initialBoard));
  chessCurrentPlayer = "white";
  chessPlayerDisplay.textContent = chessCurrentPlayer;
  initializeChessBoard();
}

// Initialize both games
initializeChessBoard();

// Event listeners for Chess
chessResetButton.addEventListener("click", resetChessGame);

// Tic Tac Toe Event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

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
