<script type="ts">
    import { tagsStorePromise, type CatTags } from "../../lib/stores";
    import { importData } from "../../lib/db";
    import { Button, TextField, FormField, Switch, Divider } from "attractions";
    import ModalButton from "../ModalButton.svelte";
    import getToast from "../../lib/toast";
    const toast = getToast();

    // 覆盖选项
    let overwrite = false;
    let overwritePreset = false;
    async function save(impData: CatTags) {
        try {
            const newData = await importData(impData, overwrite, overwritePreset);
            const ts = await tagsStorePromise;
            ts.set(newData);
            toast("成功");
        } catch (e) {
            toast(e);
        }
    }

    // 添加单个TAG
    let addTagInfo = {
        cat: "",
        tag: "",
        cn: "",
    };
    async function addOneTag() {
        if (!(addTagInfo.cat && addTagInfo.tag)) {
            toast("必须同时输入分类名和tag");
            return;
        }
        const impData = {
            [addTagInfo.cat]: {
                [addTagInfo.tag]: {
                    cn: addTagInfo.cn,
                },
            },
        };
        save(impData);
    }
    // 添加多个TAG
    let json = "";

    function addJSONTags() {
        let impData: CatTags;
        try {
            impData = JSON.parse(json);
        } catch {
            toast("错误！无法解析JSON数据");
            return;
        }
        save(impData);
    }
</script>

<ModalButton title="导入数据">
    <Switch
        bind:value={overwrite}
        on:change={() => {
            if (!overwrite) overwritePreset = false;
        }}>&nbsp;覆盖之前的数据</Switch
    >
    <Switch bind:value={overwritePreset} disabled={!overwrite}>&nbsp;覆盖预设的数据</Switch>
    <!-- Buttons -->
    <Divider />

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
            <Button on:click={addOneTag}>添加</Button>
        </div>
    </ModalButton>
    <ModalButton title="直接输入数据导入">
        本应用数据通过JSON进行交换，可以直接在此输入导出的数据
        <br />
        格式为
        <code>
            {JSON.stringify({ 分类名: { tag名: "中文翻译" } })}
        </code>
        <br />
        或者
        <code>
            {JSON.stringify({ 分类名: { tag名: { cn: "中文翻译" } } })}
        </code>
        <TextField multiline bind:value={json} />
        <div style="display:flex; justify-content:flex-end">
            <Button on:click={addJSONTags}>添加</Button>
        </div>
    </ModalButton>
</ModalButton>
