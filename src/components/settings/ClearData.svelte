<script type="ts">
    import { tagsStorePromise } from "../../lib/stores";
    import { Button } from "attractions";
    import Alert from "../Alert.svelte";
    import { clearAll } from "../../lib/db";

    let isClearAlertOpen = false;
    let isConfirmAlertOpen = false;

    async function clearData() {
        const ts = await tagsStorePromise;
        ts.clear();
        await clearAll();
        isClearAlertOpen = true;
    }
</script>

<Button on:click={() => (isConfirmAlertOpen = true)}>清除数据</Button>
<Alert bind:open={isConfirmAlertOpen} on:confirm={clearData}>确认清除？</Alert>
<Alert bind:open={isClearAlertOpen} on:confirm={() => location.reload()}>清除完成，刷新以重载默认数据</Alert>
