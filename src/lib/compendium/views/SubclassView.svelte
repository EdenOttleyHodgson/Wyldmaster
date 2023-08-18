{#if item}
    <h1>{item.name}</h1>
    <p>{item.flavour}</p>
    <p>{item.description}</p>
    <div>
        {#each item.abilities as ability }
            <div>
                <p>Level {ability.level}</p>
                <DetailedItemView itemRef={{itemID: ability.id, compType:"ABILITIES"}}/>
            </div>
        {/each}
    </div>
{/if}
<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumSubclass } from "$lib/classes/compendiumclasses";
    import DetailedItemView from "../DetailedItemView.svelte";

    export let itemID: string
    let item: CompendiumSubclass | undefined
    let compendium: Compendium
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.subclassStore.getItem(itemID)
    })

</script>