<script>
	import { onMount } from 'svelte';
	import { API_PATH } from '../lib/utilities/constants';
	
	let data = {
        totalTransactionsCount: 0
    };

	onMount(() => {
		fetch(API_PATH.DASHBOARD)
			.then((response) => response.json())
			.then((fetchData) => {
				data = fetchData;
			});
	});
</script>

<svelte:head>
	<title>Svelte</title>

	<meta name="description" content="Svelte" />
</svelte:head>

<section>
	<div id="dashboard">
		<h1>Dashboard</h1>

		<div>
			<div>Total transactions count:</div>
			<div>{data.totalTransactionsCount}</div>
		</div>
	</div>
</section>

<style>
	#dashboard {
		background-color: tomato;
	}
</style>
