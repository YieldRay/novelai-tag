<script type="ts">
    import type { TagsStore } from "../lib/stores";
    import { TextField, Button, Dot } from "attractions";

    import getToast from "../lib/toast";
    const toast = getToast();

    export let label = "default-label";

    export let info: boolean = false;
    export let attention: boolean = false;

    export let tagsStore: TagsStore;
    import { createTagsString } from "../lib/stores";
    let tagsString = createTagsString(tagsStore);
</script>

<div class="flex">
    <div>
        <Button
            on:click={async () => {
                if (!("clipboard" in navigator)) {
                    toast("浏览器不支持 Clipboard API");
                    return;
                }
                try {
                    await navigator.clipboard.writeText($tagsString);
                    toast("复制成功");
                } catch {
                    toast("请授予剪切板权限");
                }
            }}
        >
            <Dot {info} {attention} class="ml" />&nbsp;
            {label.toUpperCase()}
        </Button>
    </div>
    <div>
        <Button on:click={() => tagsStore.reset()}>清空</Button>
    </div>
</div>
<TextField value={$tagsString} multiline />

<style>
    .flex {
        display: flex;
        justify-content: space-between;
    }
</style>
