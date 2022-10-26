<script type="ts">
    export let tagsStore: TagsStore;
    import { TagsStore, createCatsStore } from "../lib/stores";
    import { Chip } from "attractions";
    import Tabs from "./Tabs.svelte";
    import Tag from "./Tag.svelte";
    import Alert from "./Alert.svelte";
    const catNames = createCatsStore(tagsStore);
    let currentCatName = $catNames[0];
    let currentClickTag = "";

    let isTagAlertOpen = false;
    let isResetTagAlertOpen = false;
</script>

<Tabs bind:value={currentCatName} items={$catNames} />
<div class="box">
    {#if typeof $tagsStore[currentCatName] === "object"}
        <!-- 渲染选中分类的tags -->
        {#each Object.entries($tagsStore[currentCatName]) as [tag, tagInfo] (tag)}
            {@const { count, cn } = tagInfo}
            <Tag
                count={count || 0}
                tag={cn || tag}
                on:minus={() => tagsStore.minus(currentCatName, tag)}
                on:plus={() => tagsStore.plus(currentCatName, tag)}
                on:clickTag={() => {
                    currentClickTag = tag;
                    isTagAlertOpen = true;
                }}
                on:clickCount={() => {
                    currentClickTag = tag;
                    isResetTagAlertOpen = true;
                }}
            />
        {/each}
    {/if}
</div>

<Alert
    bind:open={isResetTagAlertOpen}
    on:confirm={() => tagsStore.reset(currentCatName, currentClickTag)}
    on:cancel={() => {}}
>
    是否取消选中该 tag ?
    {#if currentClickTag && $tagsStore[currentCatName][currentClickTag]}
        <Chip small>
            {currentClickTag} =
            {JSON.stringify($tagsStore[currentCatName][currentClickTag])}
        </Chip>
    {/if}
</Alert>

<Alert bind:open={isTagAlertOpen}>功能待实现</Alert>

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
