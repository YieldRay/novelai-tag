<script>
    import TagInputBind from "./components/TagInputBind.svelte";
    import { promptTagsPromise, negativeTagsPromise } from "./lib/stores";
    import { savePrompt, saveNegative } from "./lib/config";
    import { Switch, Button } from "attractions";
    import { clearAll } from "./lib/config";
    import getToast from "./lib/toast";
    const toast = getToast();

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
    <Button
        on:click={async () => {
            (await promptTagsPromise).clear();
            (await negativeTagsPromise).clear();
            await clearAll();
            toast("清除完成");
        }}>清除数据</Button
    >
</div>

<TagInputBind info label="prompt" tagsStorePromise={promptTagsPromise} {l} {r} />
<br />
<TagInputBind attention label="negative" tagsStorePromise={negativeTagsPromise} {l} {r} />

<style>
</style>
