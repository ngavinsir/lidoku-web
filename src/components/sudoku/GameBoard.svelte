<script lang="ts">
  import BoardCell from "./BoardCell.svelte";

  const board = [
    [5, null, null, null, null, 9, 2, 6, null],
    [null, null, 2, 7, null, 5, null, null, 8],
    [3, 7, null, null, null, null, null, 1, 4],
    [null, 9, null, 8, 6, null, 1, null, null],
    [null, null, null, 5, null, 7, 3, 4, null],
    [null, null, null, 4, 1, 2, null, 8, null],
    [7, 1, null, null, 8, null, 6, 9, null],
    [null, 3, 4, null, null, 6, null, null, null],
    [null, 8, 6, 3, null, null, null, 2, 5],
  ];

  $: console.log(board.flat().filter(Boolean).length);

  let selectedValue: number | null = null;
</script>

<div class="flex flex-col" style="width: fit-content">
  {#each board as boardRow, row}
    <div class="flex" style="width: fit-content">
      {#each boardRow as cell, col}
        <BoardCell
          selected={selectedValue && selectedValue === cell}
          value={cell}
          index={row * 9 + col}
          on:click={() => {
            if (selectedValue === cell) {
              selectedValue = null;
            } else selectedValue = cell;
          }}
        />
      {/each}
    </div>
  {/each}
</div>
