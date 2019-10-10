<script>
  import { onMount } from 'svelte';
  import db from './db.js';
  import BudgetItem from './BudgetItem.svelte';

  let BIs = [
    {
      category: 'Grocery',
      allotted: '700',
      actual: '520'
    },
    {
      category: 'Eating Out',
      allotted: '500',
      actual: '470'
    },
    {
      category: 'Church',
      allotted: '1250',
      actual: '120'
    }
  ];

  // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // let now = new Date();
  // let month = months[now.getMonth()];
  // let year = now.getFullYear();
  
  let categories = [];
  let budgetItems = [];
  let biCategory = '';
  let allotted = 0;
  let period = '';
  
  /*---------- db functions ----------*/
  async function loadCats() {
    const result = await db.rel.find('category');
    categories = result.categories;
  }

	async function loadBIs() {
    const result = await db.rel.find('budgetItem');
    budgetItems = result.budgetItems;
    console.log('budgetItems: ', budgetItems);
	}
	
	async function add() {
    const monthYear = period.replace('-', '');
    const newBI = {
      id: `${monthYear}_${biCategory.toLowerCase()}`,
      category: biCategory.toLowerCase(),
      allotted: parseFloat(allotted),
      actual: 0,
      period
    };
    try {
      const result = await db.rel.save('budgetItem', newBI);
        // .then(() => {
        //   return db.rel.save('category', {
        //     id: biCategory.toLowerCase(),
        //     budgetItems: newBI.id
        //   });
        // });
      biCategory = '';
      allotted = 0;
      period = '';
      await loadBIs();
    }
    catch (e) {
      console.error(e);
    }
  }

  async function deleteAll() {
    console.log('resetting budgetItems!!!!');
    for (let i = 0; i < budgetItems.length; i++) {
      await db.rel.del('budgetItem', budgetItems[i]);
    }
    await loadBIs();
  }
  /*----------------------------------*/
	
  onMount(async () => {
    loadCats();
    await loadBIs();
  });
</script>

<form on:submit|preventDefault={add}>
  <label for="newBiCat">Budget Item Category</label>
  <!-- <input id="newBiCat" type="text" bind:value={biCategory} /> -->
  <input id="newBiCat" list="cats" bind:value={biCategory} />
  <datalist id="cats">
    {#each categories as category}
      <option value={category.name}>
    {/each}
  </datalist>
  <label for="newBiAllotted">Allotted</label>
  <input id="newBiAllotted" type="number" step="0.01" min="0" bind:value={allotted} />
  <label for="newBiPeriod">Month</label>
  <input id="newBiPeriod" type="month" bind:value={period} />
  <button type="submit">Submit!</button>
</form>

<button on:click={deleteAll}>Reset</button>

{#each budgetItems as bi}
  <BudgetItem {...bi} />
{/each}
