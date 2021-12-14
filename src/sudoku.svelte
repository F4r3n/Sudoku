<script>
    import wasm from '../SudokuHelper/Cargo.toml';

    let dev_mode = false;
    export let currentElementHovered = -1;
    export let currentElementSelected = -1;
    export let data;

    let sudokuHelper = null
    class Sudoku {

        constructor() {
            this._SUDOKU_SIZE=9;
            this._data = new Uint8Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE);
        }

        GetGrid() {
            return this._data;
        }

        Reset() {
            for(let i = 0; i < this._data.length; ++i) 
                this._data[i] = 0;
        }

        SetGrid(inGrid) {
            this._data = inGrid;
        }
        Check() {
            return new Promise((resolve, reject) => {
                let isValid = sudokuHelper.check_wasm(this._data);
                resolve(isValid);
            });
        }

        Solve(inGrid) {
            return new Promise((resolve, reject) => {
                let v = sudokuHelper.return_named_struct(false);
                let grid = sudokuHelper.solve_wasm(inGrid, v);
                resolve([v.is_done, grid])

            });
        }


        Generate(inLevel) {
            return new Promise((resolve, reject) => {
                let grid = sudokuHelper.generate_wasm(inLevel);
                 resolve(grid)
            }); 
        }
    };

    function displayNumpad(element) {
        currentElementSelected = parseInt(element.target.getAttribute("pos"));
    }

    function mouseOver(element) {
        currentElementHovered = element.target.getAttribute("pos");
    }



    async function Init() {
        sudokuHelper = await wasm();
    }

    function setValue(inV) {
        if(currentElementSelected >= 0 && currentElementSelected < 81) {
            sudoku.GetGrid()[currentElementSelected] = inV
            data = sudoku.GetGrid();
        }
    }

    function handleKeydown(event) {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        const key = event.key;
        switch (key) {
            case "ArrowDown":
                currentElementSelected=clamp(currentElementSelected+9, 0, 80);
                break;
            case "ArrowRight":
                currentElementSelected=clamp(currentElementSelected + 1, 0, 80);
                break;
            case "ArrowLeft":
                currentElementSelected=clamp(currentElementSelected-1, 0, 80);
            break;
            case "ArrowUp":
                currentElementSelected=clamp(currentElementSelected-9, 0, 80);
            break;
            default:
                if(key >= 0 && key <=9) {
                    setValue(key);
                }
                break;
        }
        currentElementHovered=currentElementSelected;
    }

    export const SudokuModule = 
    {
        async Generate(inLevel) {
            sudoku.Generate(inLevel).then((grid) =>{
                sudoku.SetGrid(grid);
                data = sudoku.GetGrid();
            });
        },
        async Solve() {
            sudoku.Solve(sudoku.GetGrid()).then(([done, grid]) => {
                if(done) {
                    sudoku.SetGrid(grid);
                    data = sudoku.GetGrid();
                }
                else {
                    console.log("No solution")
                }
            });        
        },
        async Load() {
            let dataStorage = localStorage.getItem("current_sudoku");
            if(dataStorage != null) {
                data = JSON.parse(dataStorage);
                sudoku.SetGrid(data);
            }
        },
        async Save() {
            localStorage.setItem("current_sudoku", "[" + data + "]");
        },
        Check() {
            return sudoku.Check();
        }
    }

    Init();
    export let sudoku = new Sudoku()
    data = sudoku.GetGrid();
</script>


<svelte:window on:keydown={handleKeydown}/>

<div class="container">
    <div class="sudoku_board">
        {#each data as block, i}
        <div class="{currentElementHovered==i 
        || ((parseInt(i/3)%3 == parseInt(currentElementHovered/3)%3) && parseInt(i/27) == parseInt(currentElementHovered/27))
        || i%9 == currentElementHovered%9
        || parseInt(i/9, 10) == parseInt(currentElementHovered/9,10) ? 'cell cell_hover' : 'cell'}" 
        class:cell_selected="{currentElementSelected==i}"
        pos={i} on:click={displayNumpad} on:mouseover={mouseOver} bind:this={currentElementHovered}>
            {block == 0 ? '' :  block}
        </div>
        {/each}
    </div>
    
    <div class="no-printme">
        <div class="bottom-menu">
            <div class="pad">
                <div class="numpad">
                    {#each [1,2,3,4,5,6,7,8,9] as i}
                    <div class="number border" on:click={() => {setValue(i)}}>{i}</div>
                    {/each}
                </div>
                <div class="number noselect" on:click={() => {setValue(0)}}>Clear</div>
                
            </div>
        </div>
    </div>
</div>


<style>


    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }

    .container {

    }

    .sudoku_board {
        width: fit-content;  
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;
  
        box-shadow: 0px 0px 5px 5px #bdc3c7;

        display: grid;
        grid-template-columns: repeat(9, 5em);
        grid-template-rows: repeat(9, 5em);
        border-right: 4px solid black;
        border-left: 2px solid black;
        border-top: 2px solid black;
        border-bottom: 4px solid black;
    }



    .cell_hover {
        background:rgb(239, 240, 199) !important;
    }

    .cell_selected {
        background: var(--main-color-light) !important;
        color:white;
    }
    @media print {
        .cell_selected {
            background: white !important;
            color:black;
        }
    }

    .cell {
        justify-content: center;
        align-items: center;
        display: flex;
        font-family: Arial;
        font-size: 3rem;
        font-weight: bold;
        background:white;

        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
	    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
	    box-sizing: border-box;
    
        box-shadow: 0px 0px 0px var(--border-sudoku--cell-size) #bdc3c7;
  
    }



    .cell:nth-child(3n+1){
        border-left: 2px solid black;
    }
    .cell:nth-child(27n+1){
        border-top: 2px solid black;
    }
    .cell:nth-child(27n+2){
        border-top: 2px solid black;
    }    .cell:nth-child(27n+3){
        border-top: 2px solid black;
    }    .cell:nth-child(27n+4){
        border-top: 2px solid black;
    }    .cell:nth-child(27n+5){
        border-top: 2px solid black;
    }    .cell:nth-child(27n+6){
        border-top: 2px solid black;
    }    .cell:nth-child(27n+7){
        border-top: 2px solid black;
    }
    .cell:nth-child(27n+8){
        border-top: 2px solid black;
    }.cell:nth-child(27n+9){
        border-top: 2px solid black;
    }

    .numpad {
        height: fit-content;
        width: fit-content;
        overflow: hidden;
  
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;

        background-color: black;
        display: grid;

        grid-template-columns: repeat(9, 5em);

    }

    .number {
        text-align: center;
        font-size: xx-large;
        opacity: 1.0;
        background: white;
        justify-content: center;
        align-items: center;
        color:var(--main-color-light);
    }

    .pad {
        justify-content: center;
        border: 2px solid var(--main-color-light);
        border-radius: 5%;
        padding: 2px;
        height: fit-content;
        width: fit-content;
        margin-bottom: 10px;
    }

    .border{
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
	    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
	    box-sizing: border-box;
        box-shadow: 0px 0px 0px 1px var(--main-color-light);
    }
    .bottom-menu {
        margin-top : 10px;
        height: fit-content;
        display: flex;
        flex-direction: column;
    }
</style>