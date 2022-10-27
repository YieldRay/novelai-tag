<script type="ts">
    import { Table } from "attractions";
    import type { TagInfo } from "src/lib/stores";

    export let cat: string;
    export let tag: string;
    export let tagInfo: TagInfo;
</script>

<Table
    style="font-size:0.8em"
    headers={[
        { text: "Key", value: "key" },
        { text: "Value", value: "value" },
    ]}
    items={[
        {
            key: "分类",
            value: cat,
        },
        {
            key: "TAG",
            value: tag,
        },
        {
            key: "中文翻译",
            value: tagInfo.cn || "(无翻译)",
        },
        {
            key: "是否预设",
            value: Boolean(tagInfo.nonpreset) ? "否" : "是",
        },
        {
            key: "prompt权重",
            value: tagInfo.prompt || 0,
        },
        {
            key: "negative权重",
            value: tagInfo.negative || 0,
        },
    ]}
/>
