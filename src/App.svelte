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

	h1 {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		text-align: center;
		color: #ff3e00;
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