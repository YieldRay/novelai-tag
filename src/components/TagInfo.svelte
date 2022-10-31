<script type="ts">
    export let prop: TagType;
    export let cat: string;
    export let tag: string;
    export let tagsStore: TagsStore;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export const update = () => dispatch("update");
    export const remove = () => dispatch("remove");

    import getToast from "../lib/toast";
    const toast = getToast();
    import { FormField, TextField, Switch, Button } from "attractions";
    import type { TagsStore, TagType } from "../lib/stores";

    const tagInfo = $tagsStore[cat][tag];
    let isPreset = !tagInfo?.nonpreset;
    let newCat = cat;
    let newTag = tag;
    let newCN = tagInfo?.cn || tag;

    async function modifyTag() {
        if (!newCat) {
            toast("请输入分类名！");
            return;
        }
        if (!newTag) {
            toast("请输入TAG！");
            return;
        }

        tagsStore.modify(
            [cat, tag],
            [
                newCat,
                newTag,
                {
                    cn: newCN,
                    [prop]: $tagsStore[cat][tag][prop],
                },
            ]
        );
        update();
        toast("已修改");
    }

    function deleteTag() {
        tagsStore.remove(cat, tag);
        remove();
        toast("已删除");
    }
</script>

<FormField name="分类名" required>
    <TextField bind:value={newCat} />
</FormField>
<FormField name="TAG" required>
    <TextField bind:value={newTag} />
</FormField>
<FormField name="中文翻译" optional>
    <TextField bind:value={newCN} />
</FormField>
<FormField name="是否预设" errors={[isPreset && "不建议修改预设"]}>
    <Switch bind:value={isPreset} />
</FormField>

<div class="flex">
    <Button on:click={modifyTag}>修改</Button>
    <Button small on:click={deleteTag}>删除</Button>
</div>

<style>
    .flex {
        display: flex;
        justify-content: flex-end;
        gap: 1em;
    }
</style>
