<script>
  export let category = 'Unknown';
  export let allotted = 0;
  export let actual = 0;

  let plusMinus = (allotted >= 0 && actual >= 0) ? allotted - actual : 0;
  let percentage = (allotted > 0 && actual >= 0) ? (actual / allotted) * 100 : 0;
</script>

<style>
  .budget-item {
    padding: 1rem;
    /* border: 2.5px solid #216583; */
  }

  .budget-item > .col > span {
    text-transform: capitalize;
  }

  /*== percentage bar styles ==*/
  .budget-item > .percentage {
    width: 100%;
    height: 2.5px;
    background-color: #dddddd;
  }
  .budget-item > .percentage::before {
    content: '';
    display: block;
    width: var(--width);
    height: inherit;
    background-color: #293462;
  }
  /*== percentage bar styles ==*/
</style>

<div class="budget-item row">
  <div class="col">
    <span class="category">Category: {category}</span>
  </div>
  <div class="col">
    <span class="allotted">Budgeted: {allotted}</span>
  </div>
  <div class="col">
    <span class="actual">Spent: {actual}</span>
  </div>
  <div class="col">
    <span>+/-: {plusMinus >= 0 ? '' : '-'}{plusMinus}</span>
  </div>
  <div class="col">
    <span>{percentage.toFixed(2)}%</span>
  </div>

  <!-- <div class="info col">
    <span class="category">{category}</span>
    <div class="amounts">
      <span class="actual">{actual}</span>
      <span class="allotted">{allotted}</span>
    </div>
    <span>{plusMinus >= 0 ? '+' : '-'}{plusMinus}</span>
    <span>&nbsp;{percentage.toFixed(2)}%</span>
  </div> -->
  <div class="percentage mt-4" style="--width: {percentage}%"></div>
</div>
