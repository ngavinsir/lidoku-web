<script lang="ts">
  import clsx from "clsx";
  export let index: number;
  export let value: number | null = null;
  export let selected = false;

  const cellBorders = [];
  if (Math.floor(index / 9) === 0) {
    cellBorders.push("border-t-3 border-t-gray-400");
  }
  if (index % 9 === 0) {
    cellBorders.push("border-l-3 border-l-gray-400");
  }
  cellBorders.push(
    index % 3 === 2 ? "border-r-3 border-r-gray-400" : "border-r-1"
  );
  cellBorders.push(
    Math.floor(index / 9) % 3 === 2
      ? "border-b-3 border-b-gray-400"
      : "border-b-1"
  );
</script>

<div
  on:click
  class={clsx(
    'w-12 h-12 text-xl cursor-pointer border-gray-600 flex justify-center items-center',
    `${cellBorders.join(' ')}`,
    {
      'hover:bg-gray-700': !selected,
      'bg-gray-600': selected,
    }
  )}
>
  {value ? value : ''}
</div>
