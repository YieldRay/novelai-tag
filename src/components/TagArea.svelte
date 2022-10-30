<script type="ts">
    export let tagsStore: TagsStore;
    export let prop: TagType;

    import { TagsStore, createCatsStore, TagType } from "../lib/stores";
    import Tabs from "./Tabs.svelte";
    import Tag from "./Tag.svelte";

    const catNames = createCatsStore(tagsStore);
    let currentCatName = $catNames[0];
</script>

<Tabs bind:value={currentCatName} items={$catNames} />
<div class="box">
    {#if typeof $tagsStore[currentCatName] === "object"}
        <!-- 渲染选中分类的tags -->
        {#each Object.entries($tagsStore[currentCatName]) as [tag] (tag)}
            <Tag cat={currentCatName} {tag} {tagsStore} {prop} />
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
