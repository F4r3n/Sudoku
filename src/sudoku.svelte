<script>

    export let currentElementSelected = -1;
    export let numpadDisplayed;
    export let data;
    class Sudoku {

        constructor() {
            this._SUDOKU_SIZE=9;
            this._data = new Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE);
        }

        Init() {
            for(let i = 0; i < this._data.length; i++) {
                this._data[i] = 0;
            }
        }

        GetGrid() {
            return this._data;
        }

        GetPos(x, y) {
            return y*this._SUDOKU_SIZE+x;
        }

        GetCoord(inPos) {
            return [inPos%this._SUDOKU_SIZE, parseInt(inPos/this._SUDOKU_SIZE)];
        }

        Iterate(inPos, callBack) {
            
        }

        IsInBlock(currentBlock, inPos) {
            return (parseInt(inPos/3)%3 == parseInt(currentBlock/3)%3) && (parseInt(inPos/27) == parseInt(currentBlock/27));
        }

        Generate() {
            console.log("Generate")
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                const random = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
                return random;
            }

            const numberOfIteration = this._SUDOKU_SIZE*this._SUDOKU_SIZE-1;
            for(let i = 0; i < numberOfIteration; i++) {

                const pos = getRandomInt(0, this._SUDOKU_SIZE*this._SUDOKU_SIZE)
                if(this._data[pos] !== 0) continue;

                const [x,y] = this.GetCoord(pos);
                let possibleValues = new Set([1,2,3,4,5,6,7,8,9]);
                for(let xi = x - 3; xi < x + 3; xi++) {
                    for(let yi = y - 3; yi < y + 3; yi++) {
                        let posi = this.GetPos(xi, yi);
                        if(this.IsInBlock(pos, posi)) {
                            const val = this._data[posi];
                            if(val !== 0) {
                                possibleValues.delete(val)
                            }
                        }
                    }
                }

                for(let xi = 0; xi < this._SUDOKU_SIZE; xi++) {
                    const posi = this.GetPos(xi, y);
                    const val = this._data[posi];
                    if(val !== 0) {
                        possibleValues.delete(val)
                    }
                    
                }
            
                for(let yi = 0; yi < this._SUDOKU_SIZE; yi++) {
                    const posi = this.GetPos(x, yi);

                    const val = this._data[posi];
                    if(val !== 0) {
                        possibleValues.delete(val)
                    }
                }
                if(possibleValues.size > 0) {
                    const items = Array.from(possibleValues);
                    this._data[pos] = items[getRandomInt(0, items.length)]
                }

            }
        }
    };

    function displayNumpad(element) {
        currentElementSelected = element.target.getAttribute("pos");
        numpadDisplayed = true;
    }

    function mouseOver(element) {
        if(!numpadDisplayed)
            currentElementSelected = element.target.getAttribute("pos");
    }

    function Generate() {
        sudoku.Generate()
        data = sudoku.GetGrid();
    }

    export function hover(elementPos) {
        console.log(elementPos)
        if(currentElementSelected == elementPos -1)
            return true;
        return false;
    }

    export let sudoku = new Sudoku()
    sudoku.Init()
    data = sudoku.GetGrid();
    numpadDisplayed = false
</script>

<button class="button" on:click={Generate}>Generate</button>

<div class="container">
    <div class="sudoku_board">
        {#each data as block, i}
        <div class="{currentElementSelected==i 
        || ((parseInt(i/3)%3 == parseInt(currentElementSelected/3)%3) && parseInt(i/27) == parseInt(currentElementSelected/27))
        || i%9 == currentElementSelected%9
        || parseInt(i/9, 10) == parseInt(currentElementSelected/9,10) ? 'cell cell_hover' : 'cell'}" pos={i} on:click={displayNumpad} on:mouseover={mouseOver} bind:this={currentElementSelected}>
            {block == 0 ? '' :  block}
        </div>
        {/each}
    </div>
    
    {#if numpadDisplayed}
        <div class="numpad">
            <div class="number border">1</div>
            <div class="number border">2</div>
            <div class="number border">3</div>
            <div class="number border">4</div>
            <div class="number border">5</div>
            <div class="number border">6</div>
            <div class="number border">7</div>
            <div class="number border">8</div>
            <div class="number border">9</div>
            <div class="number">N</div>
            <div class="number"></div>
            <div class="number">Y</div>
        </div>
    {/if}
</div>


<style>
    .container {
        position: relative;
    }


    .sudoku_board {
        margin: auto;
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

    .numpad {
        width: fit-content;
        overflow: hidden;
  
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;

        background-color: black;
        opacity: 0.9;
        left:45%;
        top:45%;
        justify-content: center;
        position: absolute;
        z-index: 9;
        display: grid;

        grid-template-columns: repeat(3, 3em);
        grid-template-rows: repeat(3, 3em);
        border: black;
        border-radius: 10%;

    }

    .number {
        font-size: xx-large;
        opacity: 1.0;
        background: grey;
        justify-content: center;
        align-items: center;
        display: flex;
        color:rgb(226, 226, 226);
    }


    .border{
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
	    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
	    box-sizing: border-box;
        box-shadow: 0px 0px 0px 1px #bdc3c7;

    }
</style>