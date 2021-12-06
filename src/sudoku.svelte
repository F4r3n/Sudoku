<script>
    import wasm from '../SudokuHelper/Cargo.toml';

    let dev_mode = false;
    export let possibleValues = []
    export let currentElementHovered = -1;
    export let currentElementSelected = -1;
    export let data;

    let sudokuHelper = null
    class Sudoku {

        constructor() {
            this._SUDOKU_SIZE=9;
            this._data = new Uint8Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE);
            this._gridCoord = null
        }

        Init() {
            this._gridCoord = this._CreateCoordGrid()
            for(let i = 0; i < this._data.length; i++) {
                this._data[i] = 0;
            }
        }

        GetGrid() {
            return this._data;
        }

        
        IsInBlock(currentBlock, inPos) {
            return this._gridCoord[currentBlock] === this._gridCoord[inPos];
        }

        GetPos(x, y) {
            return y*this._SUDOKU_SIZE+x;
        }

        GetCoord(inPos) {
            return [inPos%this._SUDOKU_SIZE, parseInt(inPos/this._SUDOKU_SIZE)];
        }

        GetPossibleValues(inPos, inGrid) {

            const [x,y] = this.GetCoord(inPos);
            let possibleValues = [1,2,3,4,5,6,7,8,9];
            for(let xi = x - 3; xi < x + 3; xi++) {
                for(let yi = y - 3; yi < y + 3; yi++) {
                    let posi = this.GetPos(xi, yi);
                    if(this.IsInBlock(inPos, posi)) {
                        const val = inGrid[posi];
                        if(val !== 0) {
                            possibleValues[val - 1] = 0
                        }
                    }
                }
            }

            for(let xi = 0; xi < this._SUDOKU_SIZE; xi++) {
                const posi = this.GetPos(xi, y);
                const val = inGrid[posi];
                if(val !== 0) {
                    possibleValues[val - 1] = 0
                }
                
            }
        
            for(let yi = 0; yi < this._SUDOKU_SIZE; yi++) {
                const posi = this.GetPos(x, yi);
                const val = inGrid[posi];
                if(val !== 0) {
                    possibleValues[val - 1] = 0
                }
            }
            return possibleValues.filter((x) => {return x !== 0;});
        }

        Reset() {
            for(let i = 0; i < this._data.length; ++i) 
                this._data[i] = 0;
        }

        SetGrid(inGrid) {
            this._data = inGrid;
        }

        _CreateCoordGrid() {
            let data = new Uint8Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE);
            for(let i = 0; i < data.length; ++i) {
                data[i] = parseInt(i/3)%3 + parseInt(i/27)*3
            }
            return data;
        }

        SolveJS(inGrid, callback) {
            return new Promise((resolve, reject) => {
                let finalGrid = inGrid;
                let stack = []
                stack.push([inGrid.slice(), 0, 0]);
                let isDone = false;
                while(stack.length > 0 && !isDone) {
                    let [grid,start,indexValue] = stack.pop()
                    let i = 0;
                    for(i = start; i < grid.length; ++i) {
                        if(grid[i] !== 0) continue;
                        let possibleValues = this.GetPossibleValues(i, grid);
                        
                        if(possibleValues.length > indexValue) {
                            grid[i] = possibleValues[indexValue];
                            if(possibleValues.length > 1)
                                stack.push([grid.slice(), i, ++indexValue]);
                            indexValue = 0;
                        }
                        else {
                            break;
                        }
                    }
                    isDone = (i === grid.length);
                    if(isDone) {
                        finalGrid = grid;
                    }
                }
                resolve([isDone, finalGrid])

            });
        }

        Solve(inGrid, callback) {
            return new Promise((resolve, reject) => {

                let v = sudokuHelper.return_named_struct(false);
                let grid = sudokuHelper.solve_wasm(inGrid, v);
                console.log(v.is_done)
                resolve([v.is_done, grid])

            });
        }


        Generate() {
            return new Promise((resolve, reject) => {

                let grid = sudokuHelper.generate_wasm(2);
                 resolve(grid)
            }); 
        }
    };

    function displayNumpad(element) {
        currentElementSelected = parseInt(element.target.getAttribute("pos"));
        console.log(currentElementSelected);
    }

    function mouseOver(element) {
        currentElementHovered = element.target.getAttribute("pos");
        possibleValues = sudoku.GetPossibleValues(currentElementHovered, sudoku.GetGrid());
    }

    async function Generate() {
        sudoku.Generate().then((grid) =>{
            sudoku.SetGrid(grid);
            data = sudoku.GetGrid();
        });
    }

    async function Solve() {
        sudoku.Solve(sudoku.GetGrid(), (inGrid) => {console.log(inGrid);data = inGrid}).then(([done, grid]) => {
            if(done) {
                sudoku.SetGrid(grid);
                data = sudoku.GetGrid();
            }
            else {
                console.log("No solution")
            }
        });        
    }

    async function SolveJS() {
        sudoku.SolveJS(sudoku.GetGrid(), (inGrid) => {console.log(inGrid);data = inGrid}).then(([done, grid]) => {
            if(done) {
                sudoku.SetGrid(grid);
                data = sudoku.GetGrid();
            }
            else {
                console.log("No solution")
            }
        });        
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

    function print() {
        console.log(sudoku.GetGrid());
    }

    Init();
    export let sudoku = new Sudoku()
    sudoku.Init()
    data = sudoku.GetGrid();
</script>
<div class="mainMenu">
    <button class="button" on:click={Generate}>Generate</button>
    <button class="button" on:click={Solve}>Solve</button>
    {#if dev_mode }
    <button class="button" on:click={SolveJS}>SolveJS</button>
    <button class="button" on:click={print}>Print</button>
    {/if}

</div>

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
    
        <div class="pad">
            <div class="numpad">
                {#each [1,2,3,4,5,6,7,8,9] as i}
                <div class="number border" on:click={() => {setValue(i)}}>{i}</div>
                {/each}
            </div>


            <div class="number" on:click={() => {setValue(0)}}>Clear</div>
            <div class ="possibleValues">{possibleValues}</div>
        </div>
        
 

</div>


<style>
    .container {
        width: fit-content;

        display: flex;
        margin: auto;
    }

    .button {
        background-color:var(--main-color-light); /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .mainMenu {
        justify-content: center;
        align-items: center;
        margin: auto;
        width: fit-content;
        padding-bottom: 1%;
    }
    .sudoku_board {
        width: fit-content;
        overflow: hidden;
  
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
    
        box-shadow: 0px 0px 0px 1px #bdc3c7;
  
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

    .pad {

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
        opacity: 0.9;
        display: grid;

        grid-template-columns: repeat(3, 3em);
        grid-template-rows: repeat(3, 3em);
        border: black;
        border-radius: 10%;

    }

    .number {
        text-align: center;
        font-size: xx-large;
        opacity: 1.0;
        background: grey;
        justify-content: center;
        align-items: center;
        color:rgb(226, 226, 226);
    }

    .possibleValues {
        color:var(--main-color-light)
    }
    .border{
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
	    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
	    box-sizing: border-box;
        box-shadow: 0px 0px 0px 1px #bdc3c7;

    }
</style>