<script>
	import Sudoku from "./sudoku.svelte";
</script>

<main>
	<h1>Sudoku!</h1>
	<Sudoku/>

	<div id="footer">For Neha ❤️</div>
</main>

<style>

	#footer {
		background-color: antiquewhite;
		font-weight: 500;
		text-align: center;
		position: absolute;
  		right: 0;
  		bottom: 0;
  		left: 0;
	}

	*,
*:before,
*:after {
  box-sizing: inherit;
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
			min-height: 100%;
			margin: 0;
			position: relative;
		}
	}
</style>