<script lang="ts">
  import clsx from "clsx";
  import { board } from "../../lib/Board";

  let className;
  export { className as class };
</script>

<div class={clsx(className, 'flex')}>
  {#each [...Array(9)] as _, num}
    <div
      class="w-12 h-12 text-xl cursor-pointer flex justify-center items-center hover:bg-gray-600"
      on:click={() => {
        board.setValue(num + 1);
      }}
    >
      {num + 1}
    </div>
  {/each}
</div>
