<script type="ts">
    import { tagsStorePromise, type CatTags } from "../lib/stores";
    import { clearAll, exportData, importData } from "../lib/config";
    import { Button, TextField, FormField } from "attractions";
    import getToast from "../lib/toast";
    const toast = getToast();
    // @ts-ignore
    import structuredClone from "@ungap/structured-clone";

    import CheckboxGroup from "./CheckBoxGroup.svelte";
    import Alert from "./Alert.svelte";
    import ModalButton from "./ModalButton.svelte";

    export let catTags: CatTags;
    let tags = structuredClone(catTags); //! This fix the bug
    let cats = Object.keys(tags);
    let selectCats = cats.map((value) => ({ value, selected: true }));
    let exportedData;
    $: {
        exportedData = exportData(
            tags,
            selectCats.filter(({ selected }) => selected).map(({ value }) => value)
        );
    }

    let isClearAlertOpen = false;
    async function addTag({ cat, tag, cn }) {
        (await tagsStorePromise).add(cat, tag, { cn });
    }
    let addTagInfo = {
        cat: "",
        tag: "",
        cn: "",
    };

    let importedData = "";
</script>

<ModalButton title="设置">
    <!-- Clear -->
    <Alert bind:open={isClearAlertOpen} on:confirm={() => location.reload()}>清除完成，刷新以重载默认数据</Alert>
    <Button
        on:click={async () => {
            (await tagsStorePromise).clear();
            await clearAll();
            isClearAlertOpen = true;
        }}
    >
        清除数据
    </Button>

    <!-- Export -->
    <ModalButton title="导出数据">
        <CheckboxGroup bind:items={selectCats} />

        <div style="display:flex;justify-content:flex-end">
            <Button on:click={() => (selectCats = selectCats.map(({ value }) => ({ value, selected: true })))}
                >全选</Button
            >
            <Button on:click={() => (selectCats = selectCats.map(({ value }) => ({ value, selected: false })))}
                >反选</Button
            >
        </div>

        <TextField style="min-width:50vw;min-height:50vh" value={JSON.stringify(exportedData)} multiline />
    </ModalButton>

    <!-- Import -->
    <ModalButton title="导入数据">
        <ModalButton title="通过输入tag信息导入">
            <FormField name="分类名" help="输入分类名" required>
                <TextField bind:value={addTagInfo.cat} />
            </FormField>
            <FormField name="tag" help="输入tag" required>
                <TextField bind:value={addTagInfo.tag} />
            </FormField>
            <FormField name="tag翻译" help="输入翻译 (可选)">
                <TextField bind:value={addTagInfo.cn} />
            </FormField>
            <div style="display:flex; justify-content:flex-end">
                <Button
                    on:click={() => {
                        if (addTagInfo.cat && addTagInfo.tag) addTag(addTagInfo).then(() => toast("添加成功"));
                        else toast("必须同时输入分类名和tag");
                    }}
                    >添加
                </Button>
            </div>
        </ModalButton>
        <ModalButton title="直接输入数据导入">
            本应用数据通过JSON进行交换，可以直接在此输入导出的数据
            <br />
            格式为 {`{"分类名": {"tag名": {"cn":"中文翻译"}}}`}
            <TextField multiline bind:value={importedData} />
            <div style="display:flex; justify-content:flex-end">
                <Button
                    on:click={() => {
                        importData(importedData)
                            .then(() => toast("成功，刷新以显示"))
                            .catch(toast);
                    }}>添加</Button
                >
            </div>
        </ModalButton>
    </ModalButton>
</ModalButton>
