<script type="ts">
    export let tagsStore: TagsStore;
    import { TagsStore, createCatsStore } from "../lib/stores";
    import Tabs from "./Tabs.svelte";
    import Tag from "./Tag.svelte";
    const catNames = createCatsStore(tagsStore);
    let currentTagName = $catNames[0];
</script>

<Tabs bind:value={currentTagName} items={$catNames} />
<div class="box">
    {#if typeof $tagsStore[currentTagName] === "object"}
        {#each Object.entries($tagsStore[currentTagName]) as [tag, tagInfo] (tag)}
            <Tag
                count={tagInfo.count || 0}
                tag={tagInfo.cn || tag}
                on:minus={() => tagsStore.minus(currentTagName, tag)}
                on:plus={() => tagsStore.plus(currentTagName, tag)}
            />
        {/each}
    {/if}
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
