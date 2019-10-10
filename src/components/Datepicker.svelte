<script>
  export let label;
  export let id;

  export let value;
</script>

{#if id}
  <label for={id}>{label}</label>
  <input id={id} type="date" bind:value={value} />
{:else}
  <label>{label}</label>
  <input type="date" bind:value={value} />
  <slot {value}></slot>
{/if}
