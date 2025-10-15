# 2048 Game

A modern implementation of the classic 2048 puzzle game built with React, TypeScript, and Vite. Features a clean, responsive design with smooth animations and keyboard controls.

![2048 Game Screenshot](https://via.placeholder.com/600x400/FAF8EF/776E65?text=2048+Game)

## 🎮 About the Game

2048 is a single-player sliding block puzzle game where the objective is to slide numbered tiles on a grid to combine them and create a tile with the number 2048. When two tiles with the same number touch, they merge into one with their sum. The game continues until you reach 2048 or no more moves are possible.

## 🚀 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The game will be available at `http://localhost:5173`

##  How to Play

### Objective
Combine numbered tiles to reach the coveted **2048** tile!

### Controls
- **Arrow Keys**: Move tiles in the corresponding direction
  - ⬅️ **Left Arrow**: Move all tiles left
  - ➡️ **Right Arrow**: Move all tiles right
  - ⬆️ **Up Arrow**: Move all tiles up
  - ⬇️ **Down Arrow**: Move all tiles down
- **Restart Button**: Start a new game at any time

### Game Rules

1. **Starting**: The game begins with two random tiles (2 or 4) on a 4x4 grid
2. **Moving**: Use arrow keys to slide all tiles in that direction
3. **Merging**: When two tiles with the same number collide, they merge into one tile with their sum
4. **Scoring**: Your score increases by the value of merged tiles
5. **New Tiles**: After each move, a new tile (2 or 4) appears in a random empty spot
6. **Winning**: Reach the 2048 tile to win!
7. **Game Over**: The game ends when no more moves are possible

### Tips & Strategy
- **Corner Strategy**: Try to keep your highest tile in a corner
- **Build in One Direction**: Focus on building up tiles in one direction
- **Don't Chase Small Tiles**: Focus on combining larger tiles
- **Plan Ahead**: Think about the consequences of each move

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Project Structure

```
src/
├── App.tsx           # Main game component
├── main.tsx          # Application entry point
├── index.css         # Global styles
├── App.css           # Component-specific styles
└── utils/
    └── helper.ts     # Game logic and utility functions
```

### Key Components

#### `App.tsx`
The main game component that handles:
- Game state management (board, score, game over status)
- Keyboard event handling
- Game initialization and restart functionality
- UI rendering

#### `utils/helper.ts`
Contains core game logic:
- `addRandomTile()` - Adds new tiles to the board
- `moveLeft/Right/Up/Down()` - Handles tile movement and merging
- `isGameOver()` - Checks if the game has ended
- Type definitions for Board and game state

##  Technical Implementation

### Technologies Used

- **React 19** - UI library with hooks for state management
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **ESLint** - Code linting and quality assurance

### Game Logic

The game uses a 2D array to represent the 4x4 grid. Key algorithms include:

1. **Tile Movement**: Each direction uses a sliding algorithm that:
   - Filters out empty cells
   - Merges adjacent identical tiles
   - Adds score from merged tiles
   - Fills remaining spaces with zeros

2. **Random Tile Generation**: New tiles (90% chance of 2, 10% chance of 4) are placed in random empty positions

3. **Game Over Detection**: Checks if no empty cells exist and no adjacent tiles can be merged

### State Management

Uses React hooks for state management:
- `useState` for board state, score, and game over status
- `useEffect` for game initialization and keyboard event listeners

##  Building for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory

3. Preview the production build:
   ```bash
   npm run preview
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

