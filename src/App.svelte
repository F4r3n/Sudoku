<script>
	import Sudoku from "./sudoku.svelte";
</script>

<main>
	<h1>Sudoku!</h1>
	<Sudoku/>

	<div id="bottom">For Neha ❤️</div>
</main>

<style>

	#bottom {
		background-color: antiquewhite;
		font-weight: 500;
		width:100%;
		padding-top: 10px;
		margin: auto 0;
		text-align: center;
	}

	h1 {
		padding: 10px;
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