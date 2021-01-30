<script lang="ts">
  import { board } from "@/lib/Board";
  import BoardCell from "./BoardCell.svelte";
  import BottomPanel from "./BottomPanel/BottomPanel.svelte";
</script>

<div class="flex flex-col" style="width: fit-content">
  {#each [...Array(9)] as _, row}
    <div class="flex" style="width: fit-content">
      {#each [...Array(9)] as _, col}
        <BoardCell
          {...$board.board.get(row * 9 + col)}
          on:click={() => {
            board.setSelectedIndex(row * 9 + col);
          }}
        />
      {/each}
    </div>
  {/each}
  <BottomPanel class="mt-4" />
</div>
