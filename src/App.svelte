<script>
    import TagArea from "./lib/TagArea.svelte";
    import InputArea from "./lib/InputArea.svelte";
    import { tags } from "./lib/stores";
</script>

注意：此应用仅能在最新版的浏览器中运行（支持top-level await）
<main>
    <InputArea label="prompt" />
    <TagArea catTagsStore={tags} />
</main>

<style>
</style>
