<script type="ts">
    export let catTagsStore; //!!! This is a store!!!
    // the raw data should like
    // {catName1: {tag1:0, tag2:1}, catName2: {tag3: 2}}
    import { Tabs } from "attractions";
    import Tag from "./Tag.svelte";
    let catNames: Array<string> = []; // this is for tabs
    let currentTagName = catNames[0];
    let tags: Array<{ cat: string; tag: string; count: number }> = [];
    $: {
        catTagsStore.subscribe((t) => {
            const isInit = catNames.length === 0;
            catNames = Object.keys(t);
            if (isInit) currentTagName = catNames[0];
            tags = [];
            for (const [cat, cats] of Object.entries(t)) {
                for (const [tag, count] of Object.entries(cats)) {
                    tags.push({ cat, tag, count });
                }
            }
        });
        console.log(tags);
        console.log();
    }
</script>

<Tabs name="menu" items={catNames} bind:value={currentTagName} />
{#each tags as { cat, tag, count } (tag)}
    {#if currentTagName === cat}
        <Tag
            catTags={$catTagsStore}
            {cat}
            {tag}
            on:minus={() => catTagsStore.minus(cat, tag)}
            on:plus={() => catTagsStore.plus(cat, tag)}
        />
    {/if}
{/each}
