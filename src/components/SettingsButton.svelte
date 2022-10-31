<script type="ts">
    export let catTags: CatTags;

    import type { CatTags } from "../lib/stores";
    import ModalButton from "./ModalButton.svelte";

    import ClearData from "./settings/ClearData.svelte";
    import ManageData from "./settings/ManageData.svelte";
    import ImportData from "./settings/ImportData.svelte";
    import ExportData from "./settings/ExportData.svelte";
    import About from "./settings/About.svelte";
</script>

<ModalButton title="设置">
    <ClearData />
    <ManageData />
    <ImportData />
    <ExportData {catTags} />
    <About />
</ModalButton>
