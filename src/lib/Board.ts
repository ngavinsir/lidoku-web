import { writable } from "svelte/store";
import { index2Col, index2Row, index2Square } from "@/utils/sudoku";

export enum BoardCellStatus {
  WRONG,
  CORRECT,
  GENERATED,
  IDLE,
}

export interface BoardCell {
  index: number;
  value: number | null;
  status: BoardCellStatus;
  selected: boolean;
  notes: Set<number>;
}

export interface Board {
  board: Map<number, BoardCell>;
  selectedIndex: number | null;
  takingNotes: boolean;
}

export type Puzzle = string;

// prettier-ignore
export const board = createBoardStore(
  // 8, 0, 3, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0,
  // 0, 0, 0, 0, 0, 7, 0, 3, 0, 0, 2, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // 8, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 9, 7, 0, 0, 1, 0, 8, 0, 0, 0, 1, 0, 0, 0, 0,
  // 0, 0, 0
  ".9....85....2..91..2.1.8.....1...534..36.......7.1....3.......9...9.7..68.....7.."
);

export function createBoardStore(puzzle: Puzzle) {
  const board = puzzle2Board(puzzle);
  const { subscribe, set, update } = writable(board);
  return {
    subscribe,
    initPuzzle: (puzzle: Puzzle) => set(puzzle2Board(puzzle)),
    setSelectedIndex: (index: number) => {
      update((board) => setSelectedIndex(board, index));
    },
    setCellValue: (value: number) => {
      update((board) => {
        if (board.takingNotes) {
          return toggleSelectedCellNotesValue(board, value);
        }
        return setCellValue(board, value);
      });
    },
    removeSelectedCell: () => {
      update((board) => removeCellValue(board, board.selectedIndex));
    },
    toggleTakingNotes: () => {
      update((board) => <Board>{ ...board, takingNotes: !board.takingNotes });
    },
    generateNotes: () => {
      update((board) => generateNotes(board));
    },
  };
}

function setSelectedIndex(board: Board, index: number) {
  _resetBoardSelection(board);
  if (index === board.selectedIndex) {
    board.selectedIndex = null;
  } else {
    for (const cell of board.board.values()) {
      if (cell.value && cell.value === board.board.get(index).value) {
        cell.selected = true;
      }
      if (cell.index === index) {
        cell.selected = true;
      }
    }
    board.selectedIndex = index;
  }
  return board;
}

function setCellValue(board: Board, value: number) {
  if (board.selectedIndex === null) {
    return board;
  }

  const index = board.selectedIndex;
  const cell = board.board.get(index);

  // can't change generated cell value
  if (cell.status === BoardCellStatus.GENERATED) return board;

  board.board.set(index, { ...cell, value });
  board.selectedIndex = null;
  return setSelectedIndex(board, index);
}

function toggleSelectedCellNotesValue(board: Board, value: number) {
  const index = board.selectedIndex;
  if (!index) return board;
  return toggleCellNotesValue(board, value, index);
}

function toggleCellNotesValue(board: Board, value: number, index: number) {
  const cell = board.board.get(index);

  if (cell.notes.has(value)) {
    cell.notes.delete(value);
  } else {
    cell.notes.add(value);
  }

  return board;
}

function removeCellValue(board: Board, index: number | null) {
  if (!index) return;
  const cell = board.board.get(index);

  // can't remove generated cell value
  if (cell.status === BoardCellStatus.GENERATED) return;

  board.board.set(index, { ...cell, value: null });
  return board;
}

function generateNotes(board: Board) {
  for (const [cellIndex, cell] of [...board.board.entries()]) {
    if (cell.value) continue;
    for (const i of [...Array(9)].keys()) {
      const noteValue = i + 1;
      if (possibleInCell(board, noteValue, cellIndex)) {
        cell.notes.add(noteValue);
      } else {
        cell.notes.delete(noteValue);
      }
    }
  }
  return board;
}

function _resetBoardSelection(board: Board) {
  for (const cell of board.board.values()) {
    cell.selected = false;
  }
}

function puzzle2Board(puzzle: Puzzle): Board {
  const board = new Map<number, BoardCell>();
  const puzzleList = puzzle.split("").map((char) => {
    if ([" ", ".", "0", "*", "_"].includes(char)) {
      return 0;
    } else {
      return parseInt(char);
    }
  });
  if (puzzleList.length === 81) {
    for (let index = 0; index < 81; index++) {
      board.set(index, <BoardCell>{
        index,
        value: puzzleList[index],
        status: puzzleList[index]
          ? BoardCellStatus.GENERATED
          : BoardCellStatus.IDLE,
        selected: false,
        notes: new Set(),
      });
    }
  }
  return <Board>{
    board,
    selectedIndex: null,
    takingNotes: false,
  };
}

function possibleInCell(board: Board, value: number, index: number) {
  const fs = [possibleInRow, possibleInCol, possibleInSquare];
  for (const f of fs) {
    if (!f(board, value, index)) return false;
  }
  return true;
}

function possibleInRow(board: Board, value: number, index: number) {
  const row = index2Row(index);
  const cellsInRow = [...board.board]
    .filter(([cellIndex, _]) => index2Row(cellIndex) === row)
    .map(([_, cell]) => cell);
  for (const cell of cellsInRow) {
    if (cell.value === value) return false;
  }
  return true;
}

function possibleInCol(board: Board, value: number, index: number) {
  const col = index2Col(index);
  const cellsInCol = [...board.board]
    .filter(([cellIndex, _]) => index2Col(cellIndex) === col)
    .map(([_, cell]) => cell);
  for (const cell of cellsInCol) {
    if (cell.value === value) return false;
  }
  return true;
}

function possibleInSquare(board: Board, value: number, index: number) {
  const square = index2Square(index);
  const cellsInSquare = [...board.board]
    .filter(([cellIndex, _]) => index2Square(cellIndex) === square)
    .map(([_, cell]) => cell);
  for (const cell of cellsInSquare) {
    if (cell.value === value) return false;
  }
  return true;
}
