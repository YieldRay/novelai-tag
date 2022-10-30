<script type="ts">
    export let label = "default-label";
    export let info: boolean = false;
    export let attention: boolean = false;
    export let tagsStore: TagsStore;
    export let prop: TagType;

    import type { TagsStore, TagType } from "../lib/stores";
    import { TextField, Button, Dot } from "attractions";

    import getToast from "../lib/toast";
    const toast = getToast();
    import copy from "../lib/copy";

    import { createTagsString } from "../lib/stores";
    let tagsString = createTagsString(prop, tagsStore);

    function copyOutput() {
        copy($tagsString).then(() => toast("已复制"));
    }

    function clearOutput() {
        tagsStore.reset(prop);
        toast("已清空");
    }
</script>

<div class="flex">
    <div>
        <Button on:click={copyOutput}>
            <Dot {info} {attention} class="ml" />&nbsp;
            {label.toUpperCase()}
        </Button>
    </div>
    <div>
        <Button on:click={clearOutput}>清空</Button>
    </div>
</div>
<TextField value={$tagsString} multiline />

<style>
    .flex {
        display: flex;
        justify-content: space-between;
    }
</style>
