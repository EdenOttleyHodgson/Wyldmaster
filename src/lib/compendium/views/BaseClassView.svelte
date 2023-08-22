{#if item}
    <h1>{item.name}</h1>
    <p>{item.description}</p>
    <p>Stamina: {item.stats.stamina}</p>
    <p>Dodge: {item.stats.dodge}</p>
    <p>Resilience: {item.stats.dodge}</p>
    <p>Magic Defense: {item.stats.dodge}</p>
    <p>Melee Proficency: {item.stats.meleeprof}</p>
    <p>Ranged Proficency: {item.stats.rangedprof}</p>
    <p>Magic Proficency: {item.stats.magicprof}</p>
{/if}

<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumBaseClass } from "$lib/compendium/compendiumclasses";

 
    export let itemID: string
    let item: CompendiumBaseClass | undefined
    let compendium: Compendium
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.baseClassStore.getItem(itemID)
    })
</script>