<script lang="ts">
  import clsx from "clsx";
  import NumberSelector from "./NumberSelector.svelte";
  import { board } from "@/lib/Board";
  import IconButton from "./IconButton.svelte";

  let className;
  export { className as class };

  const prompSudokuMessage =
    'Enter a string of 81 numbers (you can express blanks as 0, *, " ", _ or .)';
</script>

<div class={clsx(className, 'flex flex-col space-y-5')}>
  <div class="flex justify-around">
    <!-- Remove icon -->
    <IconButton
      label="Remove Number"
      on:click={() => board.removeSelectedCell()}
    >
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
    </IconButton>

    <!-- Notes icon -->
    <IconButton
      label="Manual Notes"
      toggleable={true}
      on:click={() => board.toggleTakingNotes()}
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        /></svg>
    </IconButton>

    <!-- Generate Notes icon -->
    <IconButton label="Generate Notes" on:click={() => board.generateNotes()}>
      <svg
        class="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 256 256"
      ><rect width="256" height="256" fill="none" />
        <line
          x1="104"
          y1="128"
          x2="215.99902"
          y2="128"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
        <line
          x1="104"
          y1="64"
          x2="215.99902"
          y2="64"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
        <line
          x1="103.99902"
          y1="192"
          x2="215.99902"
          y2="192"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
        <polyline
          points="40 60 56 52 56 107.994"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
        <path
          d="M41.10018,152.55059A14.00226,14.00226,0,1,1,65.609,165.82752L40,200H68"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        /></svg>
    </IconButton>

    <!-- Import Sudoku icon -->
    <IconButton
      label="Import Sudoku"
      on:click={() => {
        const puzzleString = window.prompt(prompSudokuMessage);
        board.initPuzzle(puzzleString);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 256 256"
      ><rect width="256" height="256" fill="none" />
        <path
          d="M156.68629,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8V156.68629a8,8,0,0,1-2.34315,5.65686l-51.3137,51.3137A8,8,0,0,1,156.68629,216Z"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
        <polyline
          points="215.281 159.992 160 159.992 160 215.272"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        /></svg>
    </IconButton>
  </div>

  <NumberSelector
    on:select-number={(event) => {
      board.setCellValue(event.detail);
    }}
  />
</div>
