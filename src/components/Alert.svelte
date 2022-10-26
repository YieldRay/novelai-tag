<script type="ts">
    import { Button, Subhead } from "attractions";
    import { createEventDispatcher } from "svelte";
    import Modal from "./Modal.svelte";
    export let title = "注意";
    const dispatch = createEventDispatcher();
    export const confirm = () => dispatch("confirm");
    export const cancel = () => dispatch("cancel");
   export let open = false;
</script>

<Modal {title} bind:open>
    <Subhead>
        <slot />
    </Subhead>
    <br />
    <div style="display:flex;justify-content:space-between">
        <Button
            small
            filled
            on:click={() => {
                open = false;
                confirm();
            }}>确定</Button
        >
        <Button
            small
            outline
            on:click={() => {
                open = false;
                cancel();
            }}>取消</Button
        >
    </div>
</Modal>
