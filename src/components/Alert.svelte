<script type="ts">
    import { Button, Subhead } from "attractions";
    import { createEventDispatcher } from "svelte";
    import Modal from "./Modal.svelte";
    export let title = "注意";
    const dispatch = createEventDispatcher();
    export const confirmEvent = () => dispatch("confirm");
    export let confirm = "确定";
    export const cancelEvent = () => dispatch("cancel");
    export let cancel = "取消";

    export let open = false;
    export let noButton = false;
</script>

<Modal {title} bind:open>
    <Subhead>
        <slot />
    </Subhead>
    {#if !noButton}
        <br />
        <div class="flex">
            <Button
                small
                filled
                on:click={() => {
                    open = false;
                    confirmEvent();
                }}
                >{confirm}
            </Button>
            <Button
                small
                outline
                on:click={() => {
                    open = false;
                    cancelEvent();
                }}
                >{cancel}
            </Button>
        </div>
    {/if}
</Modal>

<style>
    .flex {
        display: flex;
        gap: 0.5em;
        justify-content: flex-end;
    }
</style>
