<script lang="ts">
  export let label: string = "";
</script>

<div
  class="flex flex-col items-center justify-center p-3 space-y-2 cursor-pointer hover:bg-gray-700"
  on:click
>
  <!-- Remove icon -->
  <slot />
  <span class="text-base select-none">{label}</span>
</div>
