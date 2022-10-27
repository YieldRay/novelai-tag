<script type="ts">
    import { tagsStorePromise } from "../../lib/stores";
    import { Button } from "attractions";
    import Alert from "../Alert.svelte";
    import { clearAll } from "../../lib/db";

    let isClearAlertOpen = false;
</script>

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
