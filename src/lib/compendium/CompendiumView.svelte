<script lang="ts">
    import { onMount } from "svelte";
    import type { CompendiumType } from "$lib/compendium/CompendiumType";
    import { Compendium, getCompendium } from "./compendiumloader";
    import type { CompendiumObject } from "$lib/classes/compendiumclasses";
    import DetailedItemView from "./DetailedItemView.svelte";
    import ItemSelector from "./ItemSelector.svelte";
    export let compendiumType: CompendiumType 
    let compendium: Compendium;
    let currentItemsPromise = loadContent()
    let currentlySelectedItem: {itemID: string, compType: CompendiumType} | undefined = undefined
    async function loadContent(): Promise<CompendiumObject[] | undefined> {
        compendium = await getCompendium();
        console.log(compendium)
        switch(compendiumType){
            case "ACTIONS":
                console.log("Loading Actions")
                return compendium.actionStore.items
                break;
            case "SUBCLASSES":
                console.log("Loading Classes")
                return compendium.subclassStore.items
                break;
            case "EXCURSIONEQUIPMENT":
                console.log("Loading Excursion Equipment")
                console.log(compendium.excursionEquipmentStore.items)
                return compendium.excursionEquipmentStore.items
                break;
            case "COMBATGEAR":
                console.log("Loading Combat Gear")
                return compendium.combatGearStore.items;
                break;
            case "TAGS":
                console.log("Loading Tags")
                return compendium.tagStore.items;
                break;
        }
        console.error("Could not load Current Items")
        return undefined
    }
    onMount(loadContent)
    function handleItemSelected(e: CustomEvent<{itemID: string, compType:CompendiumType}>){
        console.log(currentlySelectedItem)
        currentlySelectedItem = e.detail
        console.log(currentlySelectedItem)
    }
</script>


{#await currentItemsPromise then currentItems }
<div style="display: flex" class="height: 90vw">
    <div>
        {#if currentItems}
        <div class="menudiv item-selectors">
            {#each currentItems as item}
                <ItemSelector itemID={item.id} compType={compendiumType} on:ItemSelected={handleItemSelected}/>
            {/each}
        </div>
        {/if}
    </div>
    <div class ="menudiv item-view">
        {#if currentlySelectedItem}
        {#key currentlySelectedItem}
            <DetailedItemView itemRef={currentlySelectedItem}/>
        {/key}
        {/if}
    </div>
</div>
{/await}
<style>
    .menudiv{
        border: 5px solid black;
        margin: 5px;
        height: 50vw
    }
    .item-selectors{
        width: 20vw;
    }
    .item-view{
        width: 80vw;
    }
</style>
