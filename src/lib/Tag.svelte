<script type="ts">
    export let count: number;
    // export let cat: string;
    export let tag: string;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    const plus = () => dispatch("plus");
    const minus = () => dispatch("minus");
</script>

<div class="box">
    <button class="btn" on:click={minus}>-</button>
    <div class="up-down">
        <div class="tag">{tag}</div>
        <div class="count">{count}</div>
    </div>
    <button class="btn" on:click={plus}>+</button>
</div>

<style>
    .box {
        display: inline-flex;
        flex-wrap: nowrap;
        color: #4300b0;
        background-color: #f4e9ff;
        overflow: hidden;
        border-radius: 2em;
        height: 2em;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
    .up-down {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 75%;
    }
    .btn {
        border: none;
        width: 1.5em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
    }
    .tag {
        padding: 0 0.25em;
    }
    .count {
        font-size: xx-small;
    }
</style>
