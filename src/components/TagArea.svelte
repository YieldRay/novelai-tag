<script type="ts">
    export let tagsStore: TagsStore;

    import { TagsStore, createCatsStore, createTagsDescStore } from "../lib/stores";
    // import { Tabs } from "attractions";
    import Tabs from "./Tabs.svelte";
    import Tag from "./Tag.svelte";

    const catNames = createCatsStore(tagsStore);
    const tags = createTagsDescStore(tagsStore);

    let currentTagName = $catNames[0];
</script>

<div style="overflow-x: auto;">
    <!-- <Tabs name="menu" items={$catNames} bind:value={currentTagName} /> -->
    <Tabs bind:value={currentTagName} items={$catNames} />
</div>
<div class="box">
    {#each $tags as { cat, tag, cn, count } (tag)}
        {#if currentTagName === cat}
            <Tag {count} tag={cn || tag} on:minus={() => tagsStore.minus(tag)} on:plus={() => tagsStore.plus(tag)} />
        {/if}
    {/each}
</div>

<style>
    .box {
        padding: 0.2em;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        gap: 0.2em;
    }
</style>
