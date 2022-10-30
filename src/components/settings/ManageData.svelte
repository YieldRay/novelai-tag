<script type="ts">
    import { tagsStorePromise } from "../../lib/stores";
    import { Button } from "attractions";
    import ModalButton from "../ModalButton.svelte";
    import getToast from "../../lib/toast";
    const toast = getToast();
    let open = false;

    async function clear() {
        const ts = await tagsStorePromise;
        ts.removeUnusedCat();
        toast("已清除");
        open = false;
    }

    async function save() {
        const ts = await tagsStorePromise;
        ts.forceSave();
        toast("已保存");
        open = false;
    }
</script>

<ModalButton title="管理数据" bind:open>
    <Button on:click={clear}>清除空分类</Button>
    <Button on:click={save}>立即保存</Button>
</ModalButton>
