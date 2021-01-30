export function index2Row(index: number) {
  return Math.floor(index / 9);
}

export function index2Col(index: number) {
  return index % 9;
}

export function rowCol2Index(row: number, col: number) {
  return row * 9 + col;
}
