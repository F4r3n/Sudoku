<script>
    import wasm from "../SudokuHelper/Cargo.toml";

    let dev_mode = false;
    export let currentElementHovered = -1;
    export let currentElementSelected = -1;
    export let data;
    let metaData;

    let sudokuHelper = null;
    class MetaData {
        constructor(value) {
            this._v = value;
        }

        HasData() {
            return this._v !=0
        }

        parse(object) {
            this._v = object._v;
        }
    }

    class Meta {

        constructor(inSize) {
            this._meta = new Array(inSize)
        }

        InitWithGrid(grid) {
            for(let i = 0; i < grid.length; ++i) {
                this._meta[i] = new MetaData(grid[i])
            }
        }

        Load(dataMeta) {
            const array = dataMeta.array
            if(array) {
                for(let i = 0; i < array.length; ++i) {
                    let d = new MetaData(0)
                    d.parse(array[i])
                    this._meta[i] = d
                }
            }
        }

        Stringify() {
            return JSON.stringify({array:this._meta})
        }

        HasData(index) {
            if(this._meta[index])
                return this._meta[index].HasData();
            return false;
        }
        
    }

    class Sudoku {


        constructor() {
            this._SUDOKU_SIZE = 9;
            this._data = new Uint8Array(this._SUDOKU_SIZE * this._SUDOKU_SIZE);
            this._metaDatas = null;
        }

        GetGrid() {
            return this._data;
        }

        GetMetaData() {
            return this._metaDatas;
        }

        Reset() {
            for (let i = 0; i < this._data.length; ++i) this._data[i] = 0;
        }

        SetGrid(inGrid, inMetaData) {
            this._data = inGrid;
            if(inMetaData) {
                this._metaDatas = inMetaData;
            }
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
                resolve([v.is_done, grid]);
            });
        }

        Generate(inLevel) {
            return new Promise((resolve, reject) => {
                let grid = sudokuHelper.generate_wasm(inLevel);
                let metadatas = new Meta(grid.length)
                metadatas.InitWithGrid(grid)
                
                resolve([grid, metadatas]);
            });
        }

        Load() {
            const dataStorage = localStorage.getItem("current_sudoku");
            const dataStorageMeta = localStorage.getItem("current_sudoku_meta");

            if (dataStorage != null) {
                const data = JSON.parse(dataStorage);
                let newMeta = null;
                const dataMeta = dataStorageMeta != null ? JSON.parse(dataStorageMeta) : null;

                if(dataMeta) {
                    newMeta = new Meta(data.length)
                    newMeta.Load(dataMeta)
                }
                sudoku.SetGrid(data, newMeta);
            }
        }

        Save() {
            localStorage.setItem("current_sudoku", "[" + this._data + "]");
            const d = this._metaDatas.Stringify()
            localStorage.setItem("current_sudoku_meta", d);
        }
    }

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
        if (currentElementSelected >= 0 && currentElementSelected < 81) {
            if(metaData != null && metaData.HasData(currentElementSelected)) {
                return;
            }
            sudoku.GetGrid()[currentElementSelected] = inV;
            data = sudoku.GetGrid();
        }
    }

    function handleKeydown(event) {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        const key = event.key;
        switch (key) {
            case "ArrowDown":
                currentElementSelected = clamp(
                    currentElementSelected + 9,
                    0,
                    80
                );
                break;
            case "ArrowRight":
                currentElementSelected = clamp(
                    currentElementSelected + 1,
                    0,
                    80
                );
                break;
            case "ArrowLeft":
                currentElementSelected = clamp(
                    currentElementSelected - 1,
                    0,
                    80
                );
                break;
            case "ArrowUp":
                currentElementSelected = clamp(
                    currentElementSelected - 9,
                    0,
                    80
                );
                break;
            default:
                if (key >= 0 && key <= 9) {
                    setValue(key);
                }
                break;
        }
        currentElementHovered = currentElementSelected;
    }

    export const SudokuModule = {
        async Generate(inLevel) {
            sudoku.Generate(inLevel).then(grid => {
                sudoku.SetGrid(grid[0], grid[1]);
                data = sudoku.GetGrid();
                metaData = sudoku.GetMetaData();
            });
        },
        async Solve() {
            sudoku.Solve(sudoku.GetGrid()).then(([done, grid]) => {
                if (done) {
                    sudoku.SetGrid(grid);
                    data = sudoku.GetGrid();
                } else {
                    console.log("No solution");
                }
            });
        },
        Load() {
            sudoku.Load();
            data = sudoku.GetGrid();
            metaData = sudoku.GetMetaData();
        },
        Save() {
            return sudoku.Save();
        },
        Check() {
            return sudoku.Check();
        },
    };

    Init();
    export let sudoku = new Sudoku();
    data = sudoku.GetGrid();
    metaData = sudoku.GetMetaData();
</script>
                    <!-- class:cell_const={metaData != null && metaData[i].HasData()} -->

<svelte:window on:keydown={handleKeydown} />
<main>
    <div class="container">
        <div class="sudoku_board">
            {#each data as block, i}
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <div
                    class={currentElementHovered == i ||
                    ((parseInt(i / 3) % 3 ==
                        parseInt(currentElementHovered / 3) % 3 &&
                        parseInt(i / 27) ==
                            parseInt(currentElementHovered / 27)) 
                    || i % 9 == currentElementHovered % 9 
                    || parseInt(i / 9, 10) == parseInt(currentElementHovered / 9, 10))
                    ? "cell cell_hover"
                    : "cell"}
                    class:cell_selected={currentElementSelected == i}
                    class:cell_active={metaData != null && !metaData.HasData(i)}
                    pos={i}
                    on:click={displayNumpad}
                    on:mouseover={mouseOver}
                    bind:this={currentElementHovered}
                >
                    {block == 0 ? "" : block}
                </div>
            {/each}
        </div>
    </div>

    <div class="no-printme">
        <div class="bottom-menu">
            <div class="pad">
                <div class="numpad">
                    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as i}
                        <div
                            class="number border"
                            on:click={() => {
                                setValue(i);
                            }}
                        >
                            {i}
                        </div>
                    {/each}
                </div>
                <div
                    class="number noselect"
                    on:click={() => {
                        setValue(0);
                    }}
                >
                    Clear
                </div>
            </div>
        </div>
    </div>
</main>

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
        margin: 0 auto;
    }

    .sudoku_board {
        width: fit-content;
        height: fit-content;
        margin: 0 auto;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        box-shadow: 0px 0px 5px 5px #bdc3c7;

        display: grid;
        grid-template-columns: repeat(9, 3rem);
        grid-template-rows: repeat(9, 3rem);
        border-right: 4px solid black;
        border-left: 2px solid black;
        border-top: 2px solid black;
        border-bottom: 4px solid black;
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

    @media screen and (max-width: 600px) {
        /* CSS for screens that are 320 pixels or less will be put in this section */
        .sudoku_board {
            grid-template-columns: repeat(9, 40px);
            grid-template-rows: repeat(9, 40px);
        }

        .numpad {
            grid-template-columns: repeat(9, 40px);
        }
    }

    .cell_active {
        color: var(--main-color-light);
    }

    .cell_hover {
        background: rgb(239, 240, 199) !important;
    }
    @media print {
        .cell_hover {
            background: white !important;
        }
    }

    .cell_selected {
        background: var(--main-color-light) !important;
        color: white;
    }
    @media print {
        .cell_selected {
            background: white !important;
            color: black;
        }
    }

    .cell {
        justify-content: center;
        align-items: center;
        display: flex;
        font-family: Arial;
        font-size: xx-large;
        font-weight: bold;
        background: white;

        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;

        box-shadow: 0px 0px 0px var(--border-sudoku--cell-size) #bdc3c7;
    }

    .cell:nth-child(3n + 1) {
        border-left: 2px solid black;
    }
    .cell:nth-child(27n + 1) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 2) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 3) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 4) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 5) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 6) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 7) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 8) {
        border-top: 2px solid black;
    }
    .cell:nth-child(27n + 9) {
        border-top: 2px solid black;
    }

    .number {
        text-align: center;
        font-size: x-large;
        opacity: 1;
        background: white;
        justify-content: center;
        align-items: center;
        color: var(--main-color-light);
    }

    .pad {
        margin: 0 auto;

        justify-content: center;
        border: 2px solid var(--main-color-light);
        border-radius: 5%;
        padding: 2px;
        height: fit-content;
        width: fit-content;
        margin-bottom: 10px;
    }

    .border {
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;
        box-shadow: 0px 0px 0px 1px var(--main-color-light);
    }
    .bottom-menu {
        margin-top: 10px;
        height: fit-content;
        display: flex;
        flex-direction: column;
    }
</style>
