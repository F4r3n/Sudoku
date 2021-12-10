<script>
    import { slide } from 'svelte/transition';

    export let items;
    export let isOpened = false;
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
</svelte:head>

<div class="navbar-button navbar-pos" class:drawer-open={isOpened}>
<img src={isOpened ? "close.png" : "./hamburger-navigation-icon-12.png"} alt="menu" width="32" height="32" on:click={() => {isOpened=!isOpened}}/>
</div>
{#if isOpened}
<div transition:slide class="drawer navbar-pos">
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
        z-index: 2 !important;
        transition-property: left;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;
    }

    .drawer-open {
        left:20%;
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
        background-color: #CCCCCC;
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
        border-right: 1px solid var(--main-color-light);
        box-shadow: 5px 6px 5px 0px #E0E0E0;
    }

    .drawer > .content {
        margin-top: 32px;
    }

</style>