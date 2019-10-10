<script>
  export let name;
  export let category;
  export let amount;
</script>

<style>
  .transaction {
    padding: 1rem;
    background-color: #f7f7f7;
  }
</style>

<div class="transaction">
  <span>{name}</span>
  <span>{category}</span>
  <span>{amount}</span>
</div>