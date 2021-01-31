<script lang="ts">
  import { index2Col, index2Row } from "@/utils/sudoku";
  import { BoardCellStatus } from "@/lib/Board";
  import clsx from "clsx";
  import WindowSize from "../utils/WindowSize.svelte";

  export let index: number;
  export let value: number | null = null;
  export let status: BoardCellStatus = BoardCellStatus.WRONG;
  export let selected = false;
  export let sameAsSelected = false;
  export let notes: Set<number> = new Set();

  let screenWidth = 0;
  let cellSize = "3.5rem";
  let noteFontSize = "0.75rem";

  const cellBorders = [];
  if (index2Row(index) === 0) {
    cellBorders.push("border-t-3 border-t-gray-400");
  }
  if (index2Col(index) === 0) {
    cellBorders.push("border-l-3 border-l-gray-400");
  }
  cellBorders.push(
    index % 3 === 2 ? "border-r-3 border-r-gray-400" : "border-r-1"
  );
  cellBorders.push(
    index2Row(index) % 3 === 2 ? "border-b-3 border-b-gray-400" : "border-b-1"
  );

  $: {
    if (screenWidth >= 550) {
      cellSize = "3.5rem";
      noteFontSize = "0.75rem";
    } else if (screenWidth > 480) {
      cellSize = "3.25rem";
      noteFontSize = "0.75rem";
    } else if (screenWidth > 450) {
      cellSize = "3rem";
      noteFontSize = "0.6rem";
    } else if (screenWidth > 410) {
      cellSize = "2.75rem";
      noteFontSize = "0.6rem";
    } else if (screenWidth > 375) {
      cellSize = "2.5rem";
      noteFontSize = "0.6rem";
    } else if (screenWidth > 340) {
      cellSize = "2.25rem";
      noteFontSize = "0.5rem";
    } else if (screenWidth > 325) {
      cellSize = "2.1rem";
      noteFontSize = "0.45rem";
    }
  }

  function getNoteValue(row: number, col: number) {
    return row * 3 + col + 1;
  }
</script>

<WindowSize bind:width={screenWidth} />

<div
  on:click
  style={`width: ${cellSize}; height: ${cellSize}`}
  class={clsx(
    'text-lg sm:text-xl cursor-pointer border-gray-600 flex',
    'justify-center items-center select-none',
    `${cellBorders.join(' ')}`,
    {
      'can-hover:hover:bg-gray-700': !selected,
      'bg-gray-500': selected,
      'bg-gray-700': sameAsSelected,
      'text-red-400': status === BoardCellStatus.WRONG,
      'text-blue-300': status === BoardCellStatus.CORRECT,
    }
  )}
>
  {value ? value : ''}

  <!-- Notes -->
  {#if !value}
    <div class="w-full h-full sm:p-1 flex flex-col justify-around">
      {#each [...Array(3)] as _, row}
        <div class="flex justify-around">
          {#each [...Array(3)] as _, col}
            <span
              class={clsx('leading-none text-gray-400 select-none', {
                invisible: !notes.has(getNoteValue(row, col)),
              })}
              style={`font-size: ${noteFontSize};`}
            >
              {getNoteValue(row, col)}
            </span>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
