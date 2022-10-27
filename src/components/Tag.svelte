<script type="ts">
    export let count: number;
    export let tag: string;
    
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export const clickTag = () => dispatch("clickTag");
    export const clickCount = () => dispatch("clickCount");
    export const plus = () => dispatch("plus");
    export const minus = () => dispatch("minus");
</script>

<div class="box" style:background={count ? "#f4e9ff" : "rgba(0,0,0,0.02)"}>
    <button class="btn" on:click={minus}>-</button>
    <div class="up-down">
        <button class="tag" on:click={clickTag}>{tag}</button>
        <button class="count" on:click={clickCount}>{count}</button>
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
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 75%;
    }
    .btn {
        all: unset;
        width: 1.5em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
    }
    .tag,
    .count {
        all: unset;
        display: block;
        width: 100%;
        text-align: center;
    }
    .tag {
        padding: 0 0.25em;
    }
    .count {
        font-size: xx-small;
        transform: scale(0.9) translateY(40%);
    }
</style>
