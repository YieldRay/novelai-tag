<script type="ts">
    import { Modal, Dialog } from "attractions";
    export let open = false;
    export let title = "";
</script>

<Modal bind:open let:closeCallback>
    <Dialog {title} {closeCallback}>
        <div class="dialog">
            <slot />
        </div>
    </Dialog>
</Modal>

<style>
    .dialog {
        max-height: 80vh;
        max-width: 80vw;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
