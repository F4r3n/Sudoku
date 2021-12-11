<script>

	import Sudoku from "./sudoku.svelte";
	import NavBar from "./navbar.svelte";
	let isNavbarOpened;
	let sudokuModule;
</script>

<main>
	<NavBar bind:isOpened={isNavbarOpened} items={[{name:"Generate", function:() => {sudokuModule.Generate()}}
, {name:"Solve", function:() => {sudokuModule.Solve()}}
, {name:"Print", function:() => {
	window.print()
}}
, {name:"Load", function:() => {sudokuModule.Load()}}
, {name:"Save", function:() => {sudokuModule.Save()}}
]}/>

		<h1>Sudoku!</h1>
		<div id="sub-title" class="no-printme">For Neha ❤️</div>
	<Sudoku bind:SudokuModule={sudokuModule}/>

</main>

<style>

	#sub-title {
		font-weight: 500;
		text-align: center;

		display: block;
    	text-align: center;
    	font-size: 15px;
		margin-left: 15%;
		margin-top: -10px;
		margin-bottom: 1%;

	}




	h1 {
		max-width: 240px;
		height: fit-content;
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