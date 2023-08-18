<script lang="ts">
    import type { CompendiumType } from "$lib/compendium/CompendiumType";
    import { createEventDispatcher, onMount } from "svelte";
    import { Compendium, getCompendium } from "./compendiumloader";
    import type { CompendiumObject } from "$lib/classes/compendiumclasses";
    let compendium: Compendium
    let item: CompendiumObject | undefined
    export let itemID: string;
    export let compType: CompendiumType
    const dispatch = createEventDispatcher<{ItemSelected:{itemID:string, compType:CompendiumType}}>();
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.getGenericItem(itemID, compType)
        console.log(item)
    })
    function selectThisItem(){
        dispatch('ItemSelected', {itemID, compType})
    }

</script>

{#if item}
<div role="button" tabindex="0" on:click={selectThisItem} on:keydown={(e) => {if (e.key === "Enter"){selectThisItem}}}>
        <p>{item.name}</p>
</div>
{/if}

<style>
    div {
        border: 2px solid green;
        margin: 5px
    }
    div:hover {
        color: darkgrey
    }
</style>


