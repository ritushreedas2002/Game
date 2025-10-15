export interface CellPosition {
  r: number;
  c: number;
}

export type Board = number[][];

export interface MoveResult {
  newBoard: Board;
  scoreGained: number;
}


const cloneBoard = (board: Board): Board => board.map((row) => [...row]);


export const addRandomTile = (board: Board): Board => {
  const emptyCells: CellPosition[] = [];
  board.forEach((row, r) =>
    row.forEach((val, c) => {
      if (val === 0) emptyCells.push({ r, c });
    })
  );
  if (emptyCells.length === 0) return board;

  const randomCell =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;

  const newBoard = cloneBoard(board);
  newBoard[randomCell.r][randomCell.c] = newValue;
  return newBoard;
};


const slideLeft = (row: number[]): [number[], number] => {
  const filtered = row.filter((val) => val !== 0);
  let scoreGained = 0;
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      filtered[i + 1] = 0;
      scoreGained += filtered[i];
    }
  }
  const merged = filtered.filter((val) => val !== 0);
  while (merged.length < row.length) merged.push(0);
  return [merged, scoreGained];
};

export const moveLeft = (board: Board): MoveResult => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const [movedRow, score] = slideLeft(row);
    totalScore += score;
    return movedRow;
  });
  return { newBoard, scoreGained: totalScore };
};

export const moveRight = (board: Board): MoveResult => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const reversed = [...row].reverse();
    const [movedRow, score] = slideLeft(reversed);
    totalScore += score;
    return movedRow.reverse();
  });
  return { newBoard, scoreGained: totalScore };
};

export const moveUp = (board: Board): MoveResult => {
  let totalScore = 0;
  const size = board.length;
  const newBoard: Board = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

  for (let c = 0; c < size; c++) {
    const col = board.map((row) => row[c]);
    const [movedCol, score] = slideLeft(col);
    totalScore += score;
    movedCol.forEach((val, r) => (newBoard[r][c] = val));
  }
  return { newBoard, scoreGained: totalScore };
};

export const moveDown = (board: Board): MoveResult => {
  let totalScore = 0;
  const size = board.length;
  const newBoard: Board = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

  for (let c = 0; c < size; c++) {
    const col = board.map((row) => row[c]).reverse();
    const [movedCol, score] = slideLeft(col);
    totalScore += score;
    movedCol.reverse().forEach((val, r) => (newBoard[r][c] = val));
  }
  return { newBoard, scoreGained: totalScore };
};


export const isGameOver = (board: Board): boolean => {
  const size = board.length;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return false;
      if (c < size - 1 && board[r][c] === board[r][c + 1]) return false;
      if (r < size - 1 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
};

export const hasWon = (board: Board): boolean => {
  const size = board.length;
  
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 2048) return true;
    }
  }
  return false;
};



export const tileColors: Record<number, string> = {
  0: "bg-[#CDC1B4]/90 text-transparent",
  2: "bg-[#EEE4DA] text-[#776E65]",
  4: "bg-[#EDE0C8] text-[#776E65]",
  8: "bg-[#F2B179] text-white",
  16: "bg-[#F59563] text-white",
  32: "bg-[#F67C5F] text-white",
  64: "bg-[#F65E3B] text-white",
  128: "bg-[#EDCF72] text-white",
  256: "bg-[#EDCC61] text-white",
  512: "bg-[#EDC850] text-white",
  1024: "bg-[#EDC53F] text-white",
  2048: "bg-[#EDC22E] text-white",
  4096: "bg-[#3C3A32] text-white",
};
