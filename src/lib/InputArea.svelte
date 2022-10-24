<script type="ts">
    import { TextField, Label } from "attractions";
    import { CatTags, tags, tags as tagsStore } from "./stores";
    import { generateOutput } from "./config";
    export let label = "default-label";
    let value = "";
    $: {
        tagsStore.subscribe((data) => (value = generateOutput(data)));
    }
</script>

<div>
    <Label>{label}</Label>
    <TextField {value} multiline />
</div>

<style>
</style>
