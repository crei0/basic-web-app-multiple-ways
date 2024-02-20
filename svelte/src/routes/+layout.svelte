<script>
	import Navigation from './Navigation.svelte';
	import './styles.css';
</script>

<div id="app-root">
	<Navigation />

	<main>
		<slot />
	</main>
</div>
