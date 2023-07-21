<script>
    import { slide } from "svelte/transition";
    import { clickOutside } from "./clickOutside.js";
    import Arrow from "./arrow.svelte";
    export let items;
    export let isOpened = false;

    function handleClickEvent() {
        if (isOpened) {
            isOpened = false;
        }
    }

    let level = 1;

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
</script>

<svelte:head>
    <link
        href="https://fonts.googleapis.com/css?family=Raleway"
        rel="stylesheet"
    />
</svelte:head>

<div
    class="navbar-button navbar-pos"
    class:drawer-open={isOpened}
    on:click={() => {
        isOpened = true;
    }}
>
    <img
        src="./hamburger-navigation-icon-12.png"
        alt="menu"
        width="32"
        height="32"
    />
</div>
<div class="no-printme">
    {#if isOpened}
        <div
            use:clickOutside
            on:click_outside={handleClickEvent}
            transition:slide
            class="drawer navbar-pos"
        >
            <div class="content">
                <div class="title">Sudoku!</div>

                <div class="item">
                    <span class="title-section">Generate</span>
                    <div class="subitem">
                        <div class="middle">Level</div>

                        <div class="select">
                            <div
                                class="reverse button"
                                on:click={() => {
                                    level--;
                                    console.log(level)
                                    if (level < 1) level = 1;
                                }}
                            >
                                <Arrow />
                            </div>
                            <div class="level">{level}</div>

                            <div
                                class="translate button"
                                on:click={() => {
                                    level++;
                                    console.log(level)

                                    if (level > 9) level = 9;
                                }}
                            >
                                <Arrow />
                            </div>
                        </div>

                        <div
                            class="button-menu"
                            on:click={() => {
                                items["Generate"](level);
                            }}
                        >
                            Generate
                        </div>
                    </div>
                </div>
                <div class="item title-section" on:click={items["Solve"]}>
                    Solve
                </div>
                <div class="item title-section" on:click={items["Check"]}>
                    Check
                </div>
                <div class="item title-section" on:click={items["Export"]}>
                    Export To PDF
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .title-section {
        font-weight: 700;
    }

    .button {
        padding-top: 5px;
    }

    .button:hover {
        cursor: pointer;
        color:chocolate;
    }

    .reverse {
        transform: scaleX(-1);
    }


    .button-menu {
        background-color: var(--main-color-light); /* Green */
        border: none;
        border-radius: 10%;
        color: white;
        padding: 7px 16px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        display: inline-block;
        margin: 4px 2px;
        width: fit-content;
        margin-left: 30%;
    }

    .select {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
        line-height: 28px;
    }

    .level {
        align-items: center;
        text-align: center;
        font-family: monospace;
    }

    .subitem {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }

    .navbar-pos {
        position: fixed;
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        left: 0;
        overflow-x: hidden; /* Disable horizontal scroll */
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .content > .title {
        font-size: xx-large;
        font-family: Raleway;
        color: var(--main-color);
    }

    .navbar-button {
        opacity: 1;
        z-index: 2 !important;
        transition-property: opacity;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;
    }

    .drawer-open {
        opacity: 0;
    }

    .item {
        color: var(--main-color-light);
        font-family: Raleway;
        font-size: x-large;
        padding-left: 1rem;
    }

    .item:hover {
        cursor: pointer;
        background-color: white;
        font-style: italic;
    }

    .drawer {
        max-width: fit-content;
        height: 100%;
        background-color: whitesmoke;
        display: flex;
        flex-direction: column;
        background-color: #efefef;
        display: flex;
        justify-content: flex-start;
        flex-direction: column; /*This solves everything*/
        border-right: 2px solid var(--main-color-light);
        box-shadow: 5px 6px 5px 0px #e0e0e0;
    }

    .drawer > .content {
        margin-top: 2rem;
    }
</style>
