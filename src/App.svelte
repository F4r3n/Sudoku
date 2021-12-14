<script>

	import Sudoku from "./sudoku.svelte";
	import NavBar from "./navbar.svelte";
	let isNavbarOpened;
	let sudokuModule;
	let isOK = false;
	let messageIsON = false;

</script>

<main>
	<NavBar bind:isOpened={isNavbarOpened} items={{"Generate":(inLevel) => {sudokuModule.Generate(inLevel)}
, "Solve":() => {sudokuModule.Solve()}
, "Export":() => {window.print()}
, "Check":() => {
	sudokuModule.Check().then((value) => {
		window.clearTimeout();
		isOK = value;
		console.log(isOK);

		messageIsON = true;

		setTimeout(() => {
			messageIsON = false;
		}, 5000);
	})
	}

}}/>

	<h1>Sudoku!</h1>
	<div id="sub-title">For Neha ❤️</div>
		<div class="message" class:message-appear={messageIsON}  
		class:message-not-valid={!isOK}>
		{isOK ? "Sudoku is valid :)" : "Sudoku is not valid ):"}</div>
	<div class="sudokus_container">
		<Sudoku bind:SudokuModule={sudokuModule}/>
	</div>

</main>

<svelte:window on:beforeunload={sudokuModule.Save()} 
			   on:load={sudokuModule.Load()}
			   ></svelte:window>

<style>

	.message-appear {
		opacity: 0.9 !important;
	}

	.message-not-valid {
		background-color: rgb(201, 67, 67) !important;
	}

	.message {
		position: fixed;
		top:100px;
		left: 50%;
		transform: translateX(-50%);
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 30px;
		padding-right: 30px;
		display: block;
		opacity: 0.0;
		background-color: rgb(46, 136, 46);
		color: white;
		border-radius: 10%;
		transition-property: opacity;
        transition-duration: 0.5s;
        transition-timing-function: ease-out;
	}

	.sudokus_container {
		margin-left: auto;
		margin-right: auto;
		width:fit-content;
		height: fit-content;
	}

	#sub-title {
		font-weight: 500;

		display: block;
    	text-align: center;
    	font-size: 15px;
		margin-left: 15%;
		margin-top: -10px;
		margin-bottom: 1%;
	}


	h1 {
		height: fit-content;
		padding-top: 0;
		margin: 0 0;
		width: 100%;
		text-align: center;
		justify-content: center;
		color: var(--main-color);
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

	

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>