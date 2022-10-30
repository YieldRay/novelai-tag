<script type="ts">
    export let cat: string;
    export let tag: string;
    export let tagsStore: TagsStore;
    export let prop: TagType;

    import TagInfo from "./TagInfo.svelte";
    import Alert from "./Alert.svelte";
    import type { TagsStore, TagType } from "../lib/stores";

    let count = $tagsStore[cat][tag][prop];
    $: count = $tagsStore[cat][tag][prop];
    let cn = $tagsStore[cat][tag].cn || tag;
    $: cn = $tagsStore[cat][tag].cn || tag;

    let isResetTagAlertOpen = false;
    let isTagAlertOpen = false;

    function clickTag() {
        isTagAlertOpen = true;
    }
    function clickCount() {
        if (count > 0) isResetTagAlertOpen = true;
    }
    function plus() {
        tagsStore.plus(prop, cat, tag);
    }
    function minus() {
        tagsStore.minus(prop, cat, tag);
    }
    function reset() {
        tagsStore.reset(prop, cat, tag);
    }
</script>

<div class="box" style:background={count ? "#f4e9ff" : "rgba(0,0,0,0.02)"}>
    <button class="btn" on:click={minus}>-</button>
    <div class="up-down">
        <button class="tag" on:click={clickTag}>{cn}</button>
        <button class="count" on:click={clickCount}>{count || 0}</button>
    </div>
    <button class="btn" on:click={plus}>+</button>
</div>

<Alert bind:open={isResetTagAlertOpen} on:confirm={reset} on:cancel={() => {}}>是否取消选中该 TAG ？</Alert>

<Alert noButton bind:open={isTagAlertOpen}>
    <div style:min-width="50vw">
        <TagInfo
            {prop}
            {tag}
            {cat}
            {tagsStore}
            on:update={() => (isTagAlertOpen = false)}
            on:remove={() => (isTagAlertOpen = false)}
        />
    </div>
</Alert>

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
