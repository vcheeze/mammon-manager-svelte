<script>
  import { onMount } from 'svelte';
  import db from './db.js';
  import Transaction from './Transaction.svelte';
  import Datepicker from './components/Datepicker.svelte';

  let transactions = [];
  let name = '';
  let category = '';
  let amount = 0;
  let date = '';

  /*---------- db functions ----------*/
  async function loadTransactions() {
    const result = await db.rel.find('transaction');
    transactions = result.transactions;
  }

  async function add() {
    let formattedDate = date.split('-');
    formattedDate.pop(); // remove day
    formattedDate = formattedDate.join(''); // create formatted string, i.e. 201909
    const budgetItem = `${formattedDate}_${category.toLowerCase()}`;
    const newTransaction = {
      id: name.toLowerCase(),
      name: name,
      category: category.toLowerCase(),
      amount,
      date,
      budgetItem
    };
    try {
      const addition = await db.rel.save('transaction', newTransaction);
      _updateBudgetItem(budgetItem, amount);
      _clearFields();
      await loadTransactions();
    }
    catch (e) {
      console.error(e);
    }
  }

  async function _updateBudgetItem(id, amount) {
    const find = await db.rel.find('budgetItem', id);
    const bi = find.budgetItems[0];
    bi.actual += parseFloat(amount);
    await db.rel.save('budgetItem', bi);
  }

  function _clearFields() {
    name = '';
    category = '';
    amount = 0;
    date = '';
  }

  async function deleteAll() {
    console.log('resetting transactions!!!!');
    for (let i = 0; i < transactions.length; i++) {
      await db.rel.del('transaction', transactions[i]);
    }
    await loadTransactions();
  }
  /*----------------------------------*/

  onMount(async () => {
    await loadTransactions();
  });
</script>

<style>
  
</style>

<form on:submit|preventDefault={add}>
  <label for="newTransactionName">Name</label>
  <input id="newTransactionName" type="text" bind:value={name} />
  <label for="newTransactionCat">Category</label>
  <input id="newTransactionCat" type="text" bind:value={category} />
  <label for="newTransactionAmount">Amount</label>
  <input id="newTransactionAmount" type="number" step="0.01" min="0" bind:value={amount} />
  <Datepicker label="Date" id="newTransactionDate" bind:value={date} />
  <button type="submit">Submit!</button>
</form>

<button on:click={deleteAll}>Reset</button>

{#each transactions as transaction}
  <Transaction {...transaction} />
{/each}