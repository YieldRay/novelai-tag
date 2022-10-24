<script type="ts">
    export let catTags;
    export let cat: string; // this is required for store
    export let tag: string;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    const plus = () => dispatch("plus");
    const minus = () => dispatch("minus");
</script>

<div class="box">
    <button on:click={minus}>-</button>
    <div class="up-down">
        <div class="tag">{tag}</div>
        <div class="count">{catTags[cat][tag]}</div>
    </div>
    <button on:click={plus}>+</button>
</div>

<style>
    .box {
        display: inline-flex;
        flex-wrap: nowrap;
    }
    .up-down {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 75%;
    }
    .tag {
    }
    .count {
        font-size: xx-small;
    }
</style>
