<script>
  import { onMount } from 'svelte';
  import db from './db.js';

  let budgets = [];
  let name = '';
  let period = '';

  /*---------- db functions ----------*/
	async function loadBudgets() {
    const result = await db.rel.find('budget');
    budgets = result.budgets;
    console.log('budgets: ', budgets);
	}
	
	async function add() {
    const monthYear = period.replace('-', '');
    const newBudget = {
      id: `${monthYear}_moneys`,
      name,
      period
    };
    // console.log('newBudget: ', newBudget);
    try {
      const result = await db.rel.save('budget', newBudget);
      await loadBudgets();
      name = '';
      period = '';
    }
    catch (e) {
      console.error(e);
    }
  }

  async function deleteAll() {
    console.log('resetting budgets!!!!');
    for (let i = 0; i < budgets.length; i++) {
      await db.rel.del('budgetItem', budgets[i]);
    }
    await loadBudgets();
  }
  /*----------------------------------*/

  onMount(async () => {
    await loadBudgets();
  });
</script>

<style>
  .budget {
    background-color: #f7f7f7;
  }
</style>

<form on:submit|preventDefault={add}>
  <label for="newBudgetName">Name</label>
  <input id="newBudgetName" type="text" bind:value={name} />
  <label for="newBudgetPeriod">Month</label>
  <input id="newBudgetPeriod" type="month" bind:value={period} />
  <button type="submit">Submit!</button>
</form>

{#each budgets as budget}
  <div class="budget row pa-4 my-1">
    <div class="col">
      {budget.name}
    </div>
    <div class="col">
      {budget.period}
    </div>
  </div>
{/each}
