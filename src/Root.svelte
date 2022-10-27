<script type="ts">
    import { tagsStorePromise, bracketsStore, type CatTags } from "./lib/stores";
    import TagArea from "./components/TagArea.svelte";
    import InputArea from "./components/InputArea.svelte";
    import { Card } from "attractions";

    import SettingsButton from "./components/SettingsButton.svelte";
    import { saveTags } from "./lib/config";
    import { Switch, Loading } from "attractions";

    window.onbeforeunload = () => {
        tagsStorePromise.then((ts) => ts.subscribe((td) => saveTags(td)));
    };

    let na_or_sd = true;
    $: {
        if (na_or_sd) bracketsStore.set(["(", ")"]);
        else bracketsStore.set(["{", "}"]);
    }

    let catTags: CatTags;
    (async () => {
        const tags = await tagsStorePromise;
        tags.subscribe((t) => (catTags = t));
    })();
</script>

<div style="display: flex; justify-content: space-between">
    <Switch bind:value={na_or_sd}>
        <span class="ml">
            {#if na_or_sd}
                NovelAI(NAIFU)
            {:else}
                Stable-Diffusion-WebUI
            {/if}
        </span>
    </Switch>

    {#if catTags}
        <SettingsButton {catTags} />
    {/if}
</div>

<Card outline>
    {#await tagsStorePromise}
        <Loading />
    {:then tagsStore}
        <InputArea info label="prompt" {tagsStore} prop="prompt" />
        <TagArea {tagsStore} prop="prompt" />
    {/await}
</Card>

<br />
<Card outline>
    {#await tagsStorePromise}
        <Loading />
    {:then tagsStore}
        <InputArea attention label="negative" {tagsStore} prop="negative" />
        <TagArea {tagsStore} prop="negative" />
    {/await}
</Card>
