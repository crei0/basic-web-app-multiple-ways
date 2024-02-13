<script>
	import Navigation from './Navigation.svelte';
	import './styles.css';
</script>

<div class="app">
	<Navigation />

	<main>
		<slot />
	</main>
</div>
