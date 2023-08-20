{#if item}
    <h1>{item.name}</h1>
    <p>{item.flavour}</p>
    <p>{item.description}</p>
    <div>
        {#each item.abilities as ability }
            <div>
                <p>Level {ability.level}</p>
                <ItemSelector itemID ={ability.id} compType ="ABILITIES" on:ItemSelected/>
            </div>
        {/each}
    </div>
    {#if item.featureTable}
        <p>TODO: Render Feature Tables</p>
    {/if}
{/if}
<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumSubclass } from "$lib/classes/compendiumclasses";
    import DetailedItemView from "../DetailedItemView.svelte";
    import ItemSelector from "../ItemSelector.svelte";

    export let itemID: string
    let item: CompendiumSubclass | undefined
    let compendium: Compendium
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.subclassStore.getItem(itemID)
    })

</script>