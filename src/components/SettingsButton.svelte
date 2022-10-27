<script type="ts">
    export let catTags: CatTags;

    import type { CatTags } from "../lib/stores";
    import ModalButton from "./ModalButton.svelte";

    import ImportData from "./settings/ImportData.svelte";
    import ExportData from "./settings/ExportData.svelte";
    import ClearData from "./settings/ClearData.svelte";
</script>

<ModalButton title="设置">
    <ClearData />
    <ExportData {catTags} />
    <ImportData />
</ModalButton>
