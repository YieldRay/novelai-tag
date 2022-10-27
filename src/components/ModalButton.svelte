<script type="ts">
    export let title: string = "";

    import Modal from "./Modal.svelte";
    import { Button } from "attractions";

    let open = false;
</script>

<Button {...$$restProps} on:click={() => (open = true)}>{title}</Button>
<Modal {title} bind:open>
    <slot />
</Modal>
