<script type="ts">
    export let title = "注意";
    export let confirm = "确定";
    export let cancel = "取消";
    export let open = false;
    export let noButton = false;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export const confirmEvent = () => dispatch("confirm");
    export const cancelEvent = () => dispatch("cancel");
    import { Button, Subhead } from "attractions";
    import Modal from "./Modal.svelte";
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
