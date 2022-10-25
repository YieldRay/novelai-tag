<script type="ts">
    import { TextField, Label } from "attractions";
    import { generateOutput } from "./config";
    export let label = "default-label";
    import type { TagsStore } from "./stores";

    export let tagsStore: TagsStore;
    export let l = "{";
    export let r = "}";

    let value = "";
    $: {
        tagsStore.subscribe((data) => (value = generateOutput(data, l, r)));
    }
</script>

<div>
    <Label>{label}</Label>
    <TextField {value} multiline />
</div>

<style>
</style>
