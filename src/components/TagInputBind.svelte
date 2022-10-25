<script type="ts">
    import TagArea from "./TagArea.svelte";
    import InputArea from "./InputArea.svelte";
    import { Card, Loading } from "attractions";
    import type { TagsStore } from "../lib/stores";
    import { fade } from "svelte/transition";

    export let tagsStorePromise: Promise<TagsStore>;
    export let label: string;
    export let info: boolean = false;
    export let attention: boolean = false;
</script>

<Card outline style="overflow: hidden">
    {#await tagsStorePromise}
        <Loading />
    {:then tagsStore}
        <div transition:fade>
            <InputArea {info} {attention} {label} {tagsStore} />
            <TagArea {tagsStore} />
        </div>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</Card>
