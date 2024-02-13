<script>
	import { PATH } from '$lib/utilities/constants';
</script>

<nav>
	<ul>
		<li>
			<a href={PATH.MAIN}>Start</a>
		</li>
		<li>
			<a href={PATH.TRANSACTIONS}>Transactions</a>
		</li>
	</ul>
</nav>

<style>
	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: var(--d-padding);
	}

	a {
		text-decoration: none;
		color: black;
	}

	a:hover,
	a:active {
		text-decoration: underline;
	}
</style>
