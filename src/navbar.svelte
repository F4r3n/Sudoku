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
            {#each items as item}
            <div class="item" on:click={item.function}>
                {item.name}
            </div>
            {/each}
        </div>
    </div>
    {/if}
</div>


<style>

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
        padding-left: 32px;
    }

    .item:hover {
        cursor: pointer;
        background-color: white;
        font-style: italic;
    }

    .drawer {
        width: 20%;
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