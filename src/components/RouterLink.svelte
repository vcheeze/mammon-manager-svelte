<script>
  import { currentRoute } from '../router.js';

  export let page = {
    path: '/',
    name: 'Budget'
  };

  function redirectTo(event) {
    currentRoute.set(event.target.pathname);
    // push path into web browser history API
    window.history.pushState({ path: page.path }, '', window.location.origin + page.path);
  };
</script>

<style>
  a {
    padding: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.08rem;
  }
</style>

<a href={page.path} on:click|preventDefault={redirectTo}>{page.name}</a>
