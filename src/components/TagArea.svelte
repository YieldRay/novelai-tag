<script type="ts">
    export let tagsStore: TagsStore;
    import { TagsStore, createCatsStore } from "../lib/stores";
    import { Button, Chip } from "attractions";
    import TagInfo from "./TagInfo.svelte";
    import Tabs from "./Tabs.svelte";
    import Tag from "./Tag.svelte";
    import Alert from "./Alert.svelte";
    import { keys } from "localforage";
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
                on:minus={() => {
                    tagsStore.minus(currentCatName, tag);
                }}
                on:plus={() => {
                    tagsStore.plus(currentCatName, tag);
                }}
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

{#if currentClickTag && Object.keys($tagsStore).length > 0 && currentClickTag in $tagsStore[currentCatName]}
    {@const tag = $tagsStore[currentCatName][currentClickTag]}
    <Alert
        bind:open={isResetTagAlertOpen}
        on:confirm={() => tagsStore.reset(currentCatName, currentClickTag)}
        on:cancel={() => {}}
    >
        <TagInfo tag={currentClickTag} cat={currentCatName} tagInfo={tag} />
        是否取消选中该 TAG ？
    </Alert>

    <Alert noButton bind:open={isTagAlertOpen}>
        <TagInfo tag={currentClickTag} cat={currentCatName} tagInfo={tag} />

        {#if tag.nonpreset}
            <div style="display:flex; justify-content:space-between;align-content:center">
                该tag是非预设tag
                <Button small on:click={() => tagsStore.remove(currentCatName, currentClickTag)}>删除</Button>
            </div>
        {:else}
            该 TAG 是预设 TAG 。
        {/if}
    </Alert>
{/if}

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
