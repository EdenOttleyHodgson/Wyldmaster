{#if item}
    <h1>{item.name}</h1>
    <p>Weight: {item.weight}</p>
    <p>Effect: {item.effect}</p>
    {#each item.actions as action }
        <ItemSelector itemID={action}, compType="ACTIONS" on:ItemSelected/>
    {/each}
    {#if item.source.sourceType && item.source.sourceType != "UNIVERSAL"}
        <p>Source:</p>
        <ItemSelector itemID={item.source.id} compType={item.source.sourceType} on:ItemSelected/>        
    {/if}

{/if}

<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumExcursionEquipment } from "$lib/classes/compendiumclasses";
    import DetailedItemView from "../DetailedItemView.svelte";
    import ItemSelector from "../ItemSelector.svelte";

 
    export let itemID: string
    let item: CompendiumExcursionEquipment | undefined
    let compendium: Compendium
    onMount(async () =>{
        compendium = await getCompendium()
        item = compendium.excursionEquipmentStore.getItem(itemID)
        console.log(item)
    })
</script>