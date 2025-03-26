# Game Collection THIS PROJECT IS MADE BY AI I DID NOT CODE ALL THIS MYSELF

A collection of classic board games built with HTML, CSS, and vanilla JavaScript. This project features two popular games: Tic Tac Toe and Chess.

## Features

### Tic Tac Toe

- Classic 3x3 grid gameplay
- Alternating turns between X and O players
- Win detection for all possible combinations
- Draw detection
- Reset game functionality
- Responsive design

### Chess

- Full 8x8 chess board
- All pieces with proper movement rules:
  - Pawns: Forward movement and diagonal captures
  - Rooks: Horizontal and vertical movement
  - Knights: L-shaped movement
  - Bishops: Diagonal movement
  - Queens: Combination of rook and bishop movements
  - Kings: One square in any direction
- Visual feedback for:
  - Selected pieces
  - Valid moves
  - Current player's turn
- Reset game functionality
- Responsive design for all screen sizes

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Vite (Build tool)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:

```bash
cd [project-directory]
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Play

### Tic Tac Toe

1. Players take turns placing X's and O's on the board
2. First player to get 3 in a row (horizontally, vertically, or diagonally) wins
3. If all squares are filled and no winner, it's a draw
4. Click the "Reset Game" button to start a new game

### Chess

1. White moves first
2. Click on a piece to select it
3. Valid moves will be highlighted in blue
4. Click on a highlighted square to move the piece
5. Players alternate turns
6. Click the "Reset Game" button to start a new game

## Project Structure

```
├── index.html          # Main HTML file
├── src/
│   ├── main.js        # Game logic and functionality
│   └── style.css      # Styling
├── public/            # Static assets
├── package.json       # Project dependencies and scripts
└── vite.config.js     # Vite configuration
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
