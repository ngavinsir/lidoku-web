import { writable } from "svelte/store";

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
}

export interface Board {
  board: Map<number, BoardCell>;
  notes: Map<number, number[]>;
  selectedIndex: number | null;
  takingNotes: boolean;
}

export type Puzzle = number[];

// prettier-ignore
export const board = createBoardStore([
  8, 0, 3, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 7, 0, 3, 0, 0, 2, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  8, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 9, 7, 0, 0, 1, 0, 8, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0
]);

export function createBoardStore(puzzle: Puzzle) {
  const board = puzzle2Board(puzzle);
  const { subscribe, update } = writable(board);
  return {
    subscribe,
    setSelectedIndex: (index: number) => {
      update((board) => setSelectedIndex(board, index));
    },
    setCellValue: (value: number) => {
      update((board) => setCellValue(board, value));
    },
    removeSelectedCell: () => {
      update((board) => removeCellValue(board, board.selectedIndex));
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
  board.board.set(index, { ...cell, value });
  board.selectedIndex = null;
  return setSelectedIndex(board, index);
}

function removeCellValue(board: Board, index: number | null) {
  if (!index) return;
  const cell = board.board.get(index);

  // can't remove generated cell value
  if (cell.status === BoardCellStatus.GENERATED) return;

  board.board.set(index, { ...cell, value: null });
  return board;
}

function _resetBoardSelection(board: Board) {
  for (const cell of board.board.values()) {
    cell.selected = false;
  }
}

function puzzle2Board(puzzle: Puzzle): Board {
  const board = new Map<number, BoardCell>();
  for (let index = 0; index < 81; index++) {
    board.set(index, <BoardCell>{
      index,
      value: puzzle[index],
      status: puzzle[index] ? BoardCellStatus.GENERATED : BoardCellStatus.IDLE,
      selected: false,
    });
  }
  return <Board>{
    board,
    selectedIndex: null,
    takingNotes: false,
  };
}
