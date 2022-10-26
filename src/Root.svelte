<script>
    import { promptTagsPromise, negativeTagsPromise, bracketsStore } from "./lib/stores";
    import TagInputBind from "./components/TagInputBind.svelte";
    import Settings from "./components/Settings.svelte";
    import { savePrompt, saveNegative } from "./lib/config";
    import { Switch, Button } from "attractions";

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
    let isSettingsOpen = false;
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

    <Button on:click={() => (isSettingsOpen = true)}>设置</Button>
    <Settings bind:open={isSettingsOpen} />
</div>

<TagInputBind info label="prompt" tagsStorePromise={promptTagsPromise} />
<br />
<TagInputBind attention label="negative" tagsStorePromise={negativeTagsPromise} />

<style>
</style>
