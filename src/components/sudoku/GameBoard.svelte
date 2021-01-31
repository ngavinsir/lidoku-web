<script lang="ts">
  import { board } from "@/lib/Board";
  import { rowCol2Index } from "@/utils/sudoku";
  import BoardCell from "./BoardCell.svelte";
  import BottomPanel from "./BottomPanel/BottomPanel.svelte";

  function handleKeyDown(event: KeyboardEvent) {
    const possibleNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (possibleNumbers.includes(event.key)) {
      board.setSelectedCellValue(parseInt(event.key));
    }
    if (event.key === "Backspace" || event.key === "Delete") {
      board.removeSelectedCell();
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="flex flex-col" style="width: fit-content">
  {#each [...Array(9)] as _, row}
    <div class="flex mx-auto" style="width: fit-content">
      {#each [...Array(9)] as _, col}
        <BoardCell
          {...$board.board.get(rowCol2Index(row, col))}
          on:click={() => {
            board.setSelectedIndex(rowCol2Index(row, col));
          }}
        />
      {/each}
    </div>
  {/each}
  <BottomPanel class="mt-4" />
</div>
