<script>
    import { slide } from 'svelte/transition';
	import {clickOutside} from './clickOutside.js';

    export let items;
    export let isOpened = false;

    function handleClickEvent() {
        if(isOpened) {
            isOpened = false;
        }
    }

    let level = 1;
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
</svelte:head>

<div class="navbar-button navbar-pos" class:drawer-open={isOpened} on:click={() => {isOpened = true}}>
<img src="./hamburger-navigation-icon-12.png" alt="menu" width="32" height="32"/>
</div>
<div class="no-printme">
    {#if isOpened}
    <div  use:clickOutside  on:click_outside={handleClickEvent} transition:slide class="drawer navbar-pos">
        <div class="content">
            <div class="title">Sudoku!</div>
            
            <div class="item">
                <span class="title-section">Generate</span>
                <div class="subitem">
                    <label>
                        Level
                        <input type="range" min="1" max="9" id="level" bind:value={level}>
                        <div style="margin-left:15px">{level}</div>
                    </label>
                    <div class="button-menu" on:click={() => {items["Generate"](level)}}>Generate</div>
                </div>

            </div>
            <div class="item title-section"  on:click={items["Solve"]}>Solve</div>
            <div class="item title-section"  on:click={items["Check"]}>Check</div>
            <div class="item title-section"  on:click={items["Export"]}>Export To PDF</div>
        </div>
    </div>
    {/if}
</div>


<style>

    .title-section {
        font-weight:700
    }

.button-menu {
        background-color:var(--main-color-light); /* Green */
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

    label { 
        display: flex 
    }

    label > input {
        margin-left: 10px;
    }

    .subitem {
        display: flex;
        flex-direction: column;
        margin-left: 10%;
    }

    .navbar-pos {
        position: fixed;
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        left: 0;
        overflow-x: hidden; /* Disable horizontal scroll */
    }

    .content > .title {
        font-size: xx-large;
        font-family: Raleway;
        color:var(--main-color)
    }

    .navbar-button
    {
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
        margin-top: 15px;
        padding-left: 5%;
    }

    .item:hover {
        cursor: pointer;
        background-color: white;
        font-style:italic;
    }

    .drawer {
        width: 30%;
        min-width: 300px;
        height: 100%;
        background-color: whitesmoke;
        display: flex;
        flex-direction: column;
        background-color:#EFEFEF;
        display:flex;
        justify-content:flex-start; 
        flex-direction: column; /*This solves everything*/
        border-right: 2px solid var(--main-color-light);
        box-shadow: 5px 6px 5px 0px #E0E0E0;
    }

    .drawer > .content {
        margin-top: 32px;
    }

</style>