<script type="ts">
    export let catTags: CatTags;

    import type { CatTags } from "../../lib/stores";
    import { exportData } from "../../lib/db";
    import { Button, TextField, Switch } from "attractions";
    import CheckboxGroup from "../CheckBoxGroup.svelte";
    import ModalButton from "../ModalButton.svelte";

    let tags: CatTags = catTags;
    let cats = Object.keys(tags);
    let selectCats = cats.map((value) => ({ value, selected: true }));
    let exportedData: string;
    let isFormat = false;
    $: {
        const exportedTags = exportData(
            tags,
            selectCats.filter(({ selected }) => selected).map(({ value }) => value)
        );
        exportedData = JSON.stringify(exportedTags, null, isFormat ? 4 : 0);
    }
</script>

<ModalButton title="导出数据">
    <div style:min-width="80vw">
        <CheckboxGroup bind:items={selectCats} />
        <div style="display:flex;justify-content:flex-end">
            <Switch bind:value={isFormat}>&nbsp;格式化</Switch>
            <Button on:click={() => (selectCats = selectCats.map(({ value }) => ({ value, selected: true })))}>
                全选
            </Button>
            <Button on:click={() => (selectCats = selectCats.map(({ value }) => ({ value, selected: false })))}>
                反选
            </Button>
        </div>

        <TextField style="min-height:50vh" value={exportedData} multiline />
    </div>
</ModalButton>
