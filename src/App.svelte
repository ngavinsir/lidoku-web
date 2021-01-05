<script lang="ts">
  import GameBoard from "./components/sudoku/GameBoard.svelte";
  import ModeSwitcher from "./ModeSwitcher.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
</script>

<Tailwindcss />
<ModeSwitcher />
<main class="p-4 mx-auto" style="width: fit-content">
  <GameBoard />
</main>
