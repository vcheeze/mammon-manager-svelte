<script>
	import { onMount } from 'svelte';
	import router, { currentRoute } from './router.js';
	import RouterLink from './components/RouterLink.svelte';

	onMount(() => {
		currentRoute.set(window.location.pathname);

		if (!history.state) {
			window.history.replaceState({path: window.location.pathname}, '',   window.location.href)
		}
	});

	function handleBackNavigation(event){
		curRoute.set(event.state.path)
	}

	export let name;
</script>

<svelte:window on:popstate={handleBackNavigation} />
<RouterLink page={{ path: '/', name: 'Budgets' }} />
<RouterLink page={{ path: '/budget', name: 'Budget' }} />
<RouterLink page={{ path: '/categories', name: 'Categories' }} />
<RouterLink page={{ path: '/transactions', name: 'Transactions' }} />

<div id="app">
	<h1>{name}</h1>
	<svelte:component this={router[$currentRoute]} />
</div>
