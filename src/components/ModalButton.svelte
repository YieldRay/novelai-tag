<script type="ts">
    import Modal from "./Modal.svelte";
    import { Button } from "attractions";
    export let title: string = "";
    let open = false;
</script>

<Button on:click={() => (open = true)}>{title}</Button>
<Modal {title} bind:open>
    <slot />
</Modal>
