import { useEffect, useState } from "react";
import {
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isGameOver,
  hasWon,
  tileColors,
} from "./utils/helper";
import type { Board } from "./utils/helper";

const App = () => {
  const size = 4;
  const createEmptyBoard = (): Board =>
    Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  const initGame = () => {
    let newBoard = addRandomTile(createEmptyBoard());
    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || won) return;
      let movedBoard: Board = board;
      let gained = 0;

      if (e.key === "ArrowLeft") {
        const res = moveLeft(board);
        movedBoard = res.newBoard;
        gained = res.scoreGained;
      } else if (e.key === "ArrowRight") {
        const res = moveRight(board);
        movedBoard = res.newBoard;
        gained = res.scoreGained;
      } else if (e.key === "ArrowUp") {
        const res = moveUp(board);
        movedBoard = res.newBoard;
        gained = res.scoreGained;
      } else if (e.key === "ArrowDown") {
        const res = moveDown(board);
        movedBoard = res.newBoard;
        gained = res.scoreGained;
      } else return;

      if (JSON.stringify(board) !== JSON.stringify(movedBoard)) {
        let newBoard = addRandomTile(movedBoard);
        setBoard(newBoard);
        setScore((prev) => prev + gained);

        if (hasWon(newBoard) && !won) {
          setWon(true);
        }
        
        if (isGameOver(newBoard)) setGameOver(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver, won]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#FAF8EF]">
      <div className="flex justify-between items-center w-[30%] mb-6">
        <h1 className="text-4xl font-extrabold text-[#776E65]">2048 Game</h1>
        <div className="flex flex-col items-center bg-[#bbada0] px-4 py-2 rounded-lg text-white">
          <span className="text-sm uppercase">Score</span>
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      <div
        className="w-[30%]  aspect-square grid gap-3 p-5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] bg-[linear-gradient(180deg,#bbada0_0%,#a49386_100%)]"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`flex items-center justify-center text-3xl font-bold rounded-xl aspect-square transition-all duration-200 ${tileColors[cell] || "bg-[#3C3A32] text-white"}`}
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))
        )}
      </div>

    
      {won && (
        <div className="absolute top-0 left-0 h-screen w-screen bg-black/40 flex flex-col items-center justify-center">
          <h2 className="text-white text-5xl font-bold mb-4">🎉 You Won! 🎉</h2>
          <p className="text-white text-xl mb-6">Congratulations! You reached 2048!</p>
          <div className="flex gap-4">
            <button
              onClick={() => setWon(false)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg"
            >
              Continue Playing
            </button>
            <button
              onClick={initGame}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg"
            >
              New Game
            </button>
          </div>
        </div>
      )}

    
      {gameOver && (
        <div className="absolute top-0 left-0 h-screen w-screen bg-black/40 flex flex-col items-center justify-center">
          <h2 className="text-white text-5xl font-bold mb-4">Game Over</h2>
          <button
            onClick={initGame}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg"
          >
            Restart Game
          </button>
        </div>
      )}

      {!gameOver && (
        <button
          onClick={initGame}
          className="mt-6 px-6 py-2 bg-[#8f7a66] text-white rounded-lg hover:bg-[#a38b74] transition"
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default App;
