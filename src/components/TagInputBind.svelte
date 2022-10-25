<script type="ts">
    import TagArea from "./TagArea.svelte";
    import InputArea from "./InputArea.svelte";
    import { Card, Loading } from "attractions";
    import type { TagsStore } from "../lib/stores";

    export let tagsStorePromise: Promise<TagsStore>;
    export let l: string;
    export let r: string;
    export let label: string;
    export let info: boolean = false;
    export let attention: boolean = false;
</script>

<Card outline>
    {#await tagsStorePromise}
        <Loading />
    {:then tagsStore}
        <InputArea {info} {attention} {label} {tagsStore} {l} {r} />
        <TagArea {tagsStore} />
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</Card>

<style>
</style>
