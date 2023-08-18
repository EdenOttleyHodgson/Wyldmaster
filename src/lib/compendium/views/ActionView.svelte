{#if item}
    <p>{item.name}</p>
    <p>{item.flavour}</p>
    <p>EFFECT: {item.effect}</p>
    <p>AP: {item.apcost}</p>
    {#each item.tags as tag }
        <DetailedItemView itemRef={{itemID: tag, compType:"TAGS"}}/>        
    {/each}
    {#if item.source.sourceType != "UNIVERSAL" && item.source.sourceType}
        <DetailedItemView itemRef={{itemID: item.source.id, compType:item.source.sourceType}}/>
    {/if}
    
{/if}


<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumAction } from "$lib/classes/compendiumclasses";
    import DetailedItemView from "../DetailedItemView.svelte";

 
    export let itemID:string
    let compendium: Compendium
    let item: CompendiumAction | undefined
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.actionStore.getItem(itemID)    
    })
</script>


