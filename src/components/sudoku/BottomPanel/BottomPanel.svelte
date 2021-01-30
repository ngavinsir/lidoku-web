<script lang="ts">
  import clsx from "clsx";
  import NumberSelector from "./NumberSelector.svelte";
  import { board } from "@/lib/Board";

  let className;
  export { className as class };
</script>

<div class={clsx(className, 'flex flex-col space-y-5')}>
  <div class="flex">
    <div
      class="flex flex-col items-center justify-center p-3 space-y-2 cursor-pointer hover:bg-gray-700"
      on:click={() => board.removeSelectedCell()}
    >
      <!-- Remove icon -->
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <span class="text-base select-none">Remove</span>
    </div>
  </div>
  <NumberSelector
    on:select-number={(event) => {
      board.setCellValue(event.detail);
    }}
  />
</div>
