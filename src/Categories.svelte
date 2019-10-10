<script>
  import { onMount } from 'svelte';
  import db from './db.js';
  import Category from './Category.svelte';

  let categories = [];
  let categoryName = '';

  /*---------- db functions ----------*/
  async function loadCats() {
    const result = await db.rel.find('category');
    categories = result.categories;
    // console.log('categories: ', categories);
  }

  async function add() {
    const newCat = {
      id: categoryName.toLowerCase(),
      name: categoryName
    };
    try {
      const addition = await db.rel.save('category', newCat);
      categoryName = '';
      await loadCats();
    }
    catch (e) {
      console.error(e);
    }
  }

  async function deleteAll() {
    console.log('resetting categories!!!!');
    for (let i = 0; i < categories.length; i++) {
      await db.rel.del('category', categories[i]);
    }
    await loadCats();
  }
  /*----------------------------------*/

  onMount(async () => {
    await loadCats();
  });
</script>

<form on:submit|preventDefault={add}>
  <input type="text" bind:value={categoryName} />
  <button type="submit">Submit!</button>
</form>

<button on:click={deleteAll}>Reset</button>

{#each categories as category}
  <Category {...category} />
{/each}
