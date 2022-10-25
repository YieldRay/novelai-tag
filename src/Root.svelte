<script>
    import TagInputBind from "./components/TagInputBind.svelte";
    import { promptTagsPromise, negativeTagsPromise, bracketsStore } from "./lib/stores";
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
    <Button
        on:click={async () => {
            (await promptTagsPromise).clear();
            (await negativeTagsPromise).clear();
            await clearAll();
            toast("清除完成");
        }}>清除数据</Button
    >
</div>

<TagInputBind info label="prompt" tagsStorePromise={promptTagsPromise} />
<br />
<TagInputBind attention label="negative" tagsStorePromise={negativeTagsPromise} />

<style>
</style>
