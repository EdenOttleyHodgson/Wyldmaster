{#if item}
    <h1>{item.name}</h1>
    <p>Weight: {item.stats.weight}</p>
    {#if "resilience" in item.stats && "dodge" in item.stats && "staminareduction" in item.stats}
        <p>Resilience: {item.stats.resilience}</p>
        <p>Dodge: {item.stats.dodge}</p>
        <p>Stamina Reduction: {item.stats.staminareduction}</p>    
    {:else if "range" in item.stats && "damage" in item.stats && "apcost" in item.stats}
        <p>Range: {item.stats.range}</p>
        <p>Damage: {item.stats.damage}</p>
        <p>AP: {item.stats.apcost}</p>
    {/if}

    {#each item.tags as tag}
        <ItemSelector itemID={tag} compType="TAGS" on:ItemSelected/>
    {/each}
{/if}
<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { armourStats, CompendiumCombatGear, weaponStats } from "$lib/classes/compendiumclasses";
    import DetailedItemView from "../DetailedItemView.svelte";
    import ItemSelector from "../ItemSelector.svelte";


    
    export let itemID: string
    let compendium: Compendium
    let item: CompendiumCombatGear | undefined
    let stats: weaponStats | armourStats
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.combatGearStore.getItem(itemID)
        console.log(item?.tags)
    })
    
</script>