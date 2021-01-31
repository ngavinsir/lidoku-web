<script lang="ts">
  import GameBoard from "./components/sudoku/GameBoard.svelte";
  import ModeSwitcher from "./ModeSwitcher.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
</script>

<Tailwindcss />
<!-- <ModeSwitcher /> -->
<main class="px-1 sm:px-4 py-4 mx-auto" style="width: fit-content">
  <GameBoard />
</main>
