<script>
	import Sudoku from "./sudoku.svelte";
</script>

<main>
	<h1>Sudoku!</h1>
<Sudoku/>
</main>

<style>
	main {

	}

	:global(:root) {
		--main-color:#ff3e00;
		--main-color-light:#ff7243;
	}

	h1 {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		text-align: center;
		color: var(--main-color);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>