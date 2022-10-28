<script type="ts">
    export let catTags: CatTags;

    import type { CatTags } from "../../lib/stores";
    import { exportData } from "../../lib/db";
    import { Button, TextField, Divider } from "attractions";
    // @ts-ignore
    import structuredClone from "@ungap/structured-clone";
    import CheckboxGroup from "../CheckBoxGroup.svelte";
    import ModalButton from "../ModalButton.svelte";

    ///// IMPORTANT /////
    let tags = structuredClone(catTags); //! This fix the bug
    ///// IMPORTANT /////

    let cats = Object.keys(tags);
    let selectCats = cats.map((value) => ({ value, selected: true }));
    let exportedData: string;
    $: {
        const exportedTags = exportData(
            tags,
            selectCats.filter(({ selected }) => selected).map(({ value }) => value)
        );
        exportedData = JSON.stringify(exportedTags);
    }
</script>

<ModalButton title="导出数据">
    <CheckboxGroup bind:items={selectCats} />
    <div style="display:flex;justify-content:flex-end">
        <Button on:click={() => (selectCats = selectCats.map(({ value }) => ({ value, selected: true })))}>全选</Button>
        <Button on:click={() => (selectCats = selectCats.map(({ value }) => ({ value, selected: false })))}>反选</Button
        >
    </div>

    <TextField style="min-width:50vw;min-height:50vh" value={exportedData} multiline />
</ModalButton>
