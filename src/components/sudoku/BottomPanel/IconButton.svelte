<script lang="ts">
  import clsx from "clsx";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label: string = "";
  export let toggleable: boolean = false;

  let toggled = false;
</script>

<div
  class={clsx(
    'flex flex-col items-center justify-center w-24 h-24 space-y-2 cursor-pointer hover:bg-gray-700',
    {
      'bg-gray-700': toggled,
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
