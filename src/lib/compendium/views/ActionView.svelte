{#if item}
    <p>{item.name}</p>
    <p>{item.flavour}</p>
    <p>EFFECT: {item.effect}</p>
    <p>AP: {item.apcost}</p>
    {#each item.tags as tag }
        <h3>Tags:</h3>
        <ItemSelector id={tag} compType="TAGS" on:ItemSelected/>       
    {/each}
    {#if item.source.id != "universal" && item.source.sourceType}
        <h3>Source:</h3>
        <ItemSelector id={item.source.id} compType={item.source.sourceType} on:ItemSelected/>        
    {/if}
    
{/if}


<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumAction } from "$lib/compendium/compendiumclasses";
    import DetailedItemView from "../DetailedItemView.svelte";
    import ItemSelector from "../ItemSelector.svelte";

 
    export let itemID:string
    let compendium: Compendium
    let item: CompendiumAction | undefined
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.actionStore.getItem(itemID)
        console.log(compendium.actionStore)
        console.log(item)
    })
</script>


