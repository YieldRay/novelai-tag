<script type="ts">
    export let tagsStore: TagsStore; //!!! This is a store!!!

    import { TagsStore, TagDesc, tagsToTagsDesc, tagsToCats } from "../lib/stores";
    import { Tabs } from "attractions";
    import Tag from "./Tag.svelte";

    let catNames: Array<string> = []; // this is for tabs
    let currentTagName = catNames[0];

    let tags: Array<TagDesc> = [];
    $: {
        tagsStore.subscribe((t) => {
            const isInit = catNames.length === 0;
            catNames = tagsToCats(t);
            if (isInit) currentTagName = catNames[0];
            tags = tagsToTagsDesc(t);
        });
    }
</script>

<Tabs name="menu" items={catNames} bind:value={currentTagName} />
{#each tags as { cat, tag, count } (tag)}
    {#if currentTagName === cat}
        <Tag {count} {tag} on:minus={() => tagsStore.minus(tag)} on:plus={() => tagsStore.plus(tag)} />
    {/if}
{/each}
