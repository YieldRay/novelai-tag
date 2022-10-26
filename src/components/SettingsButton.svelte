<script type="ts">
    import { promptTagsPromise, negativeTagsPromise, createCatsStore, type TagsStore } from "../lib/stores";
    import { clearAll, exportData } from "../lib/config";
    import { Button, TextField } from "attractions";
    import CheckboxGroup from "./CheckBoxGroup.svelte";
    import Alert from "./Alert.svelte";
    import ModalButton from "./ModalButton.svelte";
    import { derived, writable } from "svelte/store";

    export let tagsStore: TagsStore;
    let cats = createCatsStore(tagsStore);
    let selectCats = writable($cats.map((value) => ({ value, selected: true })));
    let exportedData = derived([tagsStore, selectCats], ([$tagsStore, $selectCats]) =>
        exportData(
            $tagsStore,
            $selectCats.filter(({ selected }) => selected).map(({ value }) => value)
        )
    );

    let isClearAlertOpen = false;
</script>

<ModalButton title="设置">
    <!-- Clear -->
    <Alert bind:open={isClearAlertOpen} on:confirm={() => location.reload()}>清除完成，刷新以重载默认数据</Alert>
    <Button
        on:click={async () => {
            (await promptTagsPromise).clear();
            (await negativeTagsPromise).clear();
            await clearAll();
            isClearAlertOpen = true;
        }}
    >
        清除数据
    </Button>

    <!-- Export -->
    <ModalButton title="导出数据">
        <CheckboxGroup
            bind:items={$selectCats}
           
        />
        <br />
        <TextField style="min-width:50vw;min-height:50vh" value={JSON.stringify($exportedData)} multiline />
    </ModalButton>

    <!-- Import -->
    <ModalButton title="导入数据">暂未实现</ModalButton>
</ModalButton>
