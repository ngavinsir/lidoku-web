<script>
  import WindowSize from "@/components/utils/WindowSize.svelte";
  import clsx from "clsx";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let screenWidth = 0;
</script>

<WindowSize bind:width={screenWidth} />

<div class="flex mx-auto" style="width: fit-content">
  {#each [...Array(9)] as _, num}
    <div
      class={clsx(
        'text-xl cursor-pointer flex justify-center items-center',
        'can-hover:hover:bg-gray-700 select-none',
        {
          'w-12 h-12': screenWidth >= 450,
          'w-10 h-10': screenWidth < 450 && screenWidth >= 375,
          'w-8 h-8': screenWidth < 375,
        }
      )}
      on:click={() => dispatch('select-number', num + 1)}
    >
      {num + 1}
    </div>
  {/each}
</div>
