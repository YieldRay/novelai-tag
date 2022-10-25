<script type="ts">
    export let items: Array<any>;
    export let value: any;
</script>

<div class="slider">
    {#each items as item (item)}
        <button class:checked={value === item} on:click={() => (value = item)}>{item}</button>
    {/each}
</div>

<style>
    .slider {
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        margin: auto;
    }
    button {
        color: slateblue;
        border: none;
        border-bottom: 2px rgba(0, 0, 0, 0.1) solid;
        padding: 0.5em 1em;
        background-color: transparent;
        transition: all 0.1s;
        border-radius: 0.2em;
    }
    button:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    button.checked {
        border-bottom: 2px slateblue solid;
    }
</style>
