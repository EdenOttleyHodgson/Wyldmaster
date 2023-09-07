<script lang="ts">
    import { onMount } from "svelte";
    import type { FeatureTable } from "../compendiumclasses/_CompendiumSubclass";

    export let featureTable: FeatureTable  
    let featureTableHeaders: string[] = [];
    let featureTableContents: string[][] = []
    onMount(() => {
            featureTableHeaders = featureTable.table[0]
            featureTableContents = featureTable.table.slice(1)
            console.log(featureTable)
    })
</script>

<h3 style="text-align: center;">{featureTable.name}:</h3>
<table>
    <tr>
        {#each featureTableHeaders as header}
                <th>{header}</th>
        {/each}
    </tr>
        {#each featureTableContents as contentRow}
            <tr>
                {#each contentRow as content}
                    <td>{content}</td>
                {/each}
            </tr>
        {/each}
    
</table>


<style>
    th, td, table{
        border: 1px solid black;
        border-collapse: collapse
    }
</style>