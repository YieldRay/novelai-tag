<script>
    import TagInputBind from "./lib/TagInputBind.svelte";
    import { promptTagsPromise, negativeTagsPromise } from "./lib/stores";
    import { savePrompt, saveNegative } from "./lib/config";
    import { Switch } from "attractions";

    // promptTagsPromise.then((ts) => ts.subscribe(console.log));

    window.onbeforeunload = () => {
        promptTagsPromise.then((ts) => ts.subscribe((td) => savePrompt(td)));
        negativeTagsPromise.then((ts) => ts.subscribe((td) => saveNegative(td)));
    };

    let na_or_sd = true;
    let l;
    $: l = na_or_sd ? "(" : "{";
    let r;
    $: r = na_or_sd ? ")" : "}";
</script>

<main>
    <Switch bind:value={na_or_sd}>
        <span class="ml">
            {#if na_or_sd}
                NovelAI(NAIFU)
            {:else}
                Stable-Diffusion-WebUI
            {/if}
        </span>
    </Switch>

    <TagInputBind label="prompt" tagsStorePromise={promptTagsPromise} {l} {r} />
    <TagInputBind label="negative" tagsStorePromise={negativeTagsPromise} {l} {r} />
</main>

<style>
</style>
