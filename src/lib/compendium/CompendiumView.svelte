<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { CompendiumType } from "$lib/compendium/CompendiumType";
    import { Compendium, getCompendium } from "./compendiumloader";
    import type { CompendiumObject } from "$lib/compendium/compendiumclasses";
    import DetailedItemView from "./DetailedItemView.svelte";
    import ItemSelector from "./ItemSelector.svelte";
    import type { ItemRef } from "$lib/compendium/compendiumclasses/_CompendiumStore";
    export let compendiumType: CompendiumType 
    let compendium: Compendium;
    let currentItems: CompendiumObject[] | undefined
    let currentlySelectedItem: ItemRef | undefined = undefined
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
    onMount(async () => currentItems = await loadContent())

    const dispatch = createEventDispatcher<{ItemSelected:ItemRef}>()
    function handleItemSelected(e: CustomEvent<ItemRef>){
        currentlySelectedItem = e.detail
        dispatch("ItemSelected", e.detail)
    }
</script>


{#if currentItems }
<div style="display: flex; height: 100vh">
    <div>
        {#if currentItems}
        <div class="menudiv item-selectors">
            {#each currentItems as item}
                <ItemSelector 
                    id={item.id} compType={compendiumType} 
                    on:ItemSelected={handleItemSelected}
                />
            {/each}
        </div>
        {/if}
    </div>
    {#if currentlySelectedItem}
    <div class ="menudiv item-view">
        {#key currentlySelectedItem}
            <DetailedItemView 
                itemRef={currentlySelectedItem} 
                on:ItemSelected={handleItemSelected}
                />
        {/key}
    </div>
    {/if}
</div>
{/if}
<style>
    .menudiv{
        margin: 5px;
        overflow-y: scroll;
        height: 85%;
        border: 1px solid black;
    }
    .item-selectors{
        width: 20vw;
    
    }
    .item-view{
        width: 80vw;
        border: 5px solid black;
    }
</style>
