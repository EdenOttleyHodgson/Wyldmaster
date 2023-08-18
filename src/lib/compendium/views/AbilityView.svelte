{#if item}
    
    <p>{item.name}</p>
    <p>{item.effect}</p>

    {#each item.actions as action}
        <ItemSelector itemID={action}, compType="ACTIONS" on:ItemSelected/>
    {/each}

{/if}

<script lang="ts">
    import { onMount } from "svelte";
    import { Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumAbility } from "$lib/classes/compendiumclasses";
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