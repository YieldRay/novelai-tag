<script type="ts">
    import { Modal, Dialog } from "attractions";
    export let open = false;
    export let title = "";
</script>

<Modal bind:open let:closeCallback>
    <Dialog {title} {closeCallback}>
        <slot />
    </Dialog>
</Modal>
