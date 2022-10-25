<script>
    import TagArea from "./TagArea.svelte";
    import InputArea from "./InputArea.svelte";
    export let tagsStorePromise;
    export let l;
    export let r;
    export let label;
</script>

{#await tagsStorePromise then tagsStore}
    <InputArea {label} {tagsStore} {l} {r} />
    <TagArea {tagsStore} />
{/await}

<style>
</style>
