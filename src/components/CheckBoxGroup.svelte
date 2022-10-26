<script type="ts">
    import { Checkbox, Chip } from "attractions";
    export let items: Array<{ label?: string; value: string; selected: boolean }> = [];
</script>

<div style:display="flex" style="flex-wrap:wrap;gap:0.5em">
    {#each items as item (item)}
        <Chip small outline>
            <Checkbox title={item.label || item.value} value={item.label || item.value} bind:checked={item.selected}>
                &nbsp;{item.label || item.value}
            </Checkbox>
        </Chip>
    {/each}
</div>
