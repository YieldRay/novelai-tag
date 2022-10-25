<script type="ts">
    import type { TagsStore } from "../lib/stores";
    import { TextField, Button, Dot } from "attractions";
    import { generateOutput } from "../lib/config";

    import getToast from "../lib/toast";
    const toast = getToast();

    export let label = "default-label";

    export let info: boolean = false;
    export let attention: boolean = false;

    export let tagsStore: TagsStore;
    export let l = "{";
    export let r = "}";

    let value = "";
    $: {
        tagsStore.subscribe((data) => (value = generateOutput(data, l, r)));
    }
</script>

<div>
    <Button
        on:click={async () => {
            if (!("clipboard" in navigator)) {
                toast("浏览器不支持 Clipboard API");
                return;
            }
            try {
                await navigator.clipboard.writeText(value);
                toast("复制成功");
            } catch {
                toast("请授予剪切板权限");
            }
        }}
    >
        <Dot {info} {attention} class="ml" />&nbsp;
        {label.toUpperCase()}
    </Button>
    <TextField {value} multiline />
</div>

<style>
</style>
