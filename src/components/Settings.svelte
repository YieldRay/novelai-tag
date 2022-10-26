<script>
    import { promptTagsPromise, negativeTagsPromise } from "../lib/stores";
    import { clearAll } from "../lib/config";
    import getToast from "../lib/toast";
    const toast = getToast();
    import Modal from "./Modal.svelte";
    import { Button } from "attractions";
    export let open = false;
</script>

<Modal bind:open title="设置">
    <Button
        on:click={async () => {
            (await promptTagsPromise).clear();
            (await negativeTagsPromise).clear();
            await clearAll();
            toast("清除完成");
        }}>清除数据</Button
    >
    <Button
        on:click={() => {
            alert("暂未实现");
        }}>导出数据</Button
    >
    <Button
        on:click={() => {
            alert("暂未实现");
        }}>导入数据</Button
    >
</Modal>
