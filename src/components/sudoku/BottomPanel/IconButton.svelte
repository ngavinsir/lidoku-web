<script lang="ts">
  import WindowSize from "@/components/utils/WindowSize.svelte";
  import clsx from "clsx";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label: string = "";
  export let toggleable: boolean = false;

  let toggled = false;
  let screenWidth = 0;
</script>

<WindowSize bind:width={screenWidth} />

<div
  class={clsx(
    'flex flex-col items-center justify-center space-y-2 cursor-pointer can-hover:hover:bg-gray-700',
    {
      'bg-gray-700': toggled,
      'w-24 h-24': screenWidth > 400,
      'w-20 h-20': screenWidth <= 400 && screenWidth >= 375,
      'w-16 h-16': screenWidth < 375,
    }
  )}
  on:click={(event) => {
    if (toggleable) toggled = !toggled;
    dispatch('click', event);
  }}
>
  <slot />
  <span
    class="text-sm select-none text-center leading-none"
    style="max-width: 10ch"
  >{label}</span>
</div>
