{#if item}
    
    <p>{item.name}</p>
    <p>{item.effect}</p>

    {#each item.actions as action}
        <h3>Actions:</h3>
        <ItemSelector id={action} compType="ACTIONS" on:ItemSelected/>
    {/each}
    {#if item.source.id != "universal"}
        <h3>Source:</h3>
        <ItemSelector id={item.source.id} compType={item.source.sourceType} on:ItemSelected/>
    {/if}
{/if}

<script lang="ts">
    import { onMount } from "svelte";
    import { Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumAbility } from "$lib/compendium/compendiumclasses";
    import ActionView from "./ActionView.svelte";
    import ItemSelector from "../ItemSelector.svelte";

    let item: CompendiumAbility | undefined
    export let itemID: string
    let compendium: Compendium
    onMount(async () =>{ 
        compendium = await getCompendium()
        item = compendium.abilityStore.getItem(itemID)
    })
    
</script>