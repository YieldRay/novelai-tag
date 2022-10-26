<script>
    import { promptTagsPromise, negativeTagsPromise, bracketsStore } from "./lib/stores";
    import TagArea from "./components/TagArea.svelte";
    import InputArea from "./components/InputArea.svelte";
    import { Card } from "attractions";

    import SettingsButton from "./components/SettingsButton.svelte";
    import { savePrompt, saveNegative } from "./lib/config";
    import { Switch, Loading } from "attractions";

    // promptTagsPromise.then((ts) => ts.subscribe(console.log));

    window.onbeforeunload = () => {
        promptTagsPromise.then((ts) => ts.subscribe((td) => savePrompt(td)));
        negativeTagsPromise.then((ts) => ts.subscribe((td) => saveNegative(td)));
    };

    let na_or_sd = true;
    $: {
        if (na_or_sd) bracketsStore.set(["(", ")"]);
        else bracketsStore.set(["{", "}"]);
    }
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

    {#await promptTagsPromise then tagsStore}
        <SettingsButton {tagsStore} />
    {/await}
</div>

<Card outline>
    {#await promptTagsPromise}
        <Loading />
    {:then promptTags}
        <InputArea info label="prompt" tagsStore={promptTags} />
        <TagArea tagsStore={promptTags} />
    {/await}
</Card>
<br />
<Card outline>
    {#await negativeTagsPromise}
        <Loading />
    {:then negativeTags}
        <InputArea info label="negative" tagsStore={negativeTags} />
        <TagArea tagsStore={negativeTags} />
    {/await}
</Card>
