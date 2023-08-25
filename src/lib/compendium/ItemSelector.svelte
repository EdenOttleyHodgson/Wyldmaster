<script lang="ts">
    import type { CompendiumType } from "$lib/compendium/CompendiumType";
    import { createEventDispatcher, onMount } from "svelte";
    import { Compendium, getCompendium } from "./compendiumloader";
    import type { CompendiumAbility, CompendiumObject } from "$lib/compendium/compendiumclasses";
    import type { ItemRef } from "$lib/compendium/compendiumclasses/_CompendiumStore";
    let compendium: Compendium
    let item: CompendiumObject | undefined
    export let id: string;
    export let compType: CompendiumType
    const dispatch = createEventDispatcher<{ItemSelected:ItemRef, AbilitySelected:{source:string, level: number}}>();
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.getGenericItem(id, compType)
    })
    function selectThisItem(){
        dispatch('ItemSelected', {id, compType})
        if(compType === "ABILITIES") {
            let ability = item as CompendiumAbility
        }
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


