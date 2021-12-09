<script>
	import Sudoku from "./sudoku.svelte";
</script>

<main>

		<h1>Sudoku!</h1>
		<div id="sub-title">For Neha ❤️</div>
	
	<Sudoku/>

</main>

<style>

	#sub-title {
		font-weight: 500;
		text-align: center;

		display: block;
    	text-align: center;
    	font-size: 15px;
		margin-left: 15%;
		margin-top: -20px;
		margin-bottom: 1%;

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