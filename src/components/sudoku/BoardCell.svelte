<script lang="ts">
  import { index2Col, index2Row } from "@/utils/sudoku";
  import clsx from "clsx";
  export let index: number;
  export let value: number | null = null;
  export let selected = false;
  export let notes: Set<number> = new Set();

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

  function getNoteValue(row: number, col: number) {
    return row * 3 + col + 1;
  }
</script>

<div
  on:click
  class={clsx(
    'w-14 h-14 text-xl cursor-pointer border-gray-600 flex justify-center items-center',
    `${cellBorders.join(' ')}`,
    {
      'hover:bg-gray-700': !selected,
      'bg-gray-600': selected,
    }
  )}
>
  {value ? value : ''}

  <!-- Notes -->
  {#if !value}
    <div class="w-full h-full p-1 flex flex-col justify-around">
      {#each [...Array(3)] as _, row}
        <div class="flex justify-around">
          {#each [...Array(3)] as _, col}
            <span
              class={clsx('text-xs text-gray-400', {
                invisible: !notes.has(getNoteValue(row, col)),
              })}
            >
              {getNoteValue(row, col)}
            </span>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
