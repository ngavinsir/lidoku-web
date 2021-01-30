<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="flex mx-auto" style="width: fit-content">
  {#each [...Array(9)] as _, num}
    <div
      class="w-12 h-12 text-xl cursor-pointer flex justify-center items-center
    hover:bg-gray-700 select-none"
      on:click={() => dispatch('select-number', num + 1)}
    >
      {num + 1}
    </div>
  {/each}
</div>
