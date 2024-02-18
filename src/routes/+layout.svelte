<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
</svelte:head>
<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: #ffffff;
		font-family: "Roboto", sans-serif;
	}
	:global(h1, h2, h3, h4, h5, h6) {
		font-family: "Roboto", sans-serif;
	}
	:global(p, a, button) {
		font-family: "Roboto", sans-serif;
	}
	:global(input, select, textarea, label) {
		font-family: "Roboto", sans-serif;
	}
</style>
