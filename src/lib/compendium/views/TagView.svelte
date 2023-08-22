
{#if item}
    <p>{item.name}</p>
    <p>{item.description}</p>
{/if}

<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumTag } from "$lib/compendium/compendiumclasses";

 
    export let itemID: string
    let item: CompendiumTag | undefined
    let compendium: Compendium
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.tagStore.getItem(itemID)    
    })
</script>