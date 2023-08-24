<script lang="ts">
    import type { Character } from "$lib/charactercreator/classes/Character";
    import CompendiumView from "$lib/compendium/CompendiumView.svelte";
    import DetailedItemView from "$lib/compendium/DetailedItemView.svelte";
    import ItemSelector from "$lib/compendium/ItemSelector.svelte";
    import type { ItemRef } from "$lib/compendium/compendiumclasses/_CompendiumStore.js";
    import { getCompendium, type Compendium } from "$lib/compendium/compendiumloader.js";
    import AbilityView from "$lib/compendium/views/AbilityView.svelte";
    import CombatGearView from "$lib/compendium/views/CombatGearView.svelte";
    import ExcursionEquipmentView from "$lib/compendium/views/ExcursionEquipmentView.svelte";
    import { onMount } from "svelte";
    export let data
    let inventoryKey = false
    let character = data.character as Character
    console.log(character)
    let showingItem = false
    let showingInventoryAddScreen = false
    let CombatGearOrEquipment: "EXCURSIONEQUIPMENT" | "COMBATGEAR" = "COMBATGEAR"
    let currentItemRef: ItemRef
    let currentWeight: number 
    const maxWeight = 10 
    let compendium: Compendium
    let itemToAdd: ItemRef
    onMount(async () => {
        compendium = await getCompendium()
        currentWeight = calculateWeight()
    })
    function handleItemSelected(e:CustomEvent<ItemRef>){
        console.log(currentItemRef)
        console.log(e.detail)
        currentItemRef = e.detail
        showingItem = true
    }
    function calculateWeight(): number{
        let newWeight = 0
        character.staticInfo.inventory.forEach((x) =>{
            if(x.compType === "COMBATGEAR"){
                let w = compendium.combatGearStore.getItem(x.id)?.stats.weight
                if(w){
                    newWeight+= w
                } else {console.error("Could not find combat gear: " + x.id )}
            } else if(x.compType === "EXCURSIONEQUIPMENT"){
                let w = compendium.excursionEquipmentStore.getItem(x.id)?.weight
                if(w){
                    newWeight+= w
                } else {console.error("Could not find excursion equipment: " + x.id )}
            } else {
                console.warn("Inventory has Non Inventory Items!")
            }
        })
        return newWeight
    }

    function updateItemToAdd(e: CustomEvent<ItemRef>){
        itemToAdd = e.detail
    }

    function addItemToInventory() {
        if(itemToAdd.compType === "EXCURSIONEQUIPMENT" || itemToAdd.compType === "COMBATGEAR") {
            character.staticInfo.inventory.push(itemToAdd)
            showingInventoryAddScreen = false
            currentWeight = calculateWeight()
            saveCharacter()
        }
        console.warn("Tried to add a non inventory item to the inventory.")
    }
    function removeInventoryItem(item: ItemRef){
        const idx = character.staticInfo.inventory.indexOf(item)
        character.staticInfo.inventory.splice(idx, 1)
        inventoryKey = !inventoryKey
        currentWeight = calculateWeight()
    }
    function saveCharacter(){
        //todo
    }
</script>


{#if showingItem}
    {#key currentItemRef}
   	<!-- svelte-ignore a11y-no-static-element-interactions -->
 		<div
        
			class="modal-background"
			on:click|self={() => showingItem= false}
			on:keydown={(e) => {
				if (e.key === 'Escape') showingItem = false;
			}}
		>
            <div class="itemView">
                <DetailedItemView itemRef={currentItemRef} on:ItemSelected={handleItemSelected}/>
            </div>
        </div>
     
    {/key}
{/if}

{#if showingInventoryAddScreen}
   	<!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
            class="modal-background"
			on:click|self={() => showingInventoryAddScreen= false}
			on:keydown={(e) => {
				if (e.key === 'Escape') showingInventoryAddScreen = false;
			}}
            >
            <div style="align-content: center">
                {#if CombatGearOrEquipment === "COMBATGEAR"}
                    <CompendiumView compendiumType = {"COMBATGEAR"} on:ItemSelected = {updateItemToAdd}/>
                {:else if CombatGearOrEquipment === "EXCURSIONEQUIPMENT"}
                    <CompendiumView compendiumType = {"EXCURSIONEQUIPMENT"}/>
                {/if}
                <div style="display: flex; align-content: center">
                    <button on:click={addItemToInventory}>Add Selected Item To Inventory</button>
                    <button on:click={() => showingInventoryAddScreen = false}>Cancel</button>
                </div>
            </div>
        </div>
{:else}
<div class="border-div">
    <div class="top-div">
            top
    </div>
    <div class="middle-div flex-div">
        <div class="left-div">
            <div class="actions-status-div">
                <div class="stats-div"></div>
                <div class="actions-div"></div>
            </div>
            <div class="navbar-div"></div>
        </div>
        <div class="inventory-div">
            <p>Weight: {currentWeight} / {maxWeight}</p>
            {#key inventoryKey}
                {#each character.staticInfo.inventory as item}
                <div style="display: flex">
                    <ItemSelector id={item.id} compType={item.compType} on:ItemSelected={handleItemSelected}/>
                    <button on:click={()=>removeInventoryItem(item)}>Remove</button>
                </div>
                {/each}
            {/key}
            <button on:click={() => {showingInventoryAddScreen = true}}>Add To Inventory</button>
        </div>

    </div>

</div>


{/if}


<style>
    .border-div{
        margin: 10px;
        margin-top: 20px;
        border: 5px solid green;
        height: 95dvh;
    }
    div{
        border: 3px solid black;
        margin: 5px;
        
    }
    .top-div{
        height: 5dvh
    }
    .left-div{
        width: 60%;
    }
    .inventory-div{
        width: 40%
    }
    .navbar-div{
        height: 5%
    }
    .actions-status-div{
        height: 90%;
        display: flex
    }
    .middle-div{

        display: flex;
        height: 87dvh;
    }
    .stats-div{
        width: 50%;
    }
    .actions-div{
        width: 50%;
    }
	.modal-background {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 40;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(20px);
	}
    .inventory-add-screen{
        position: fixed;
		display: flex;
		left: 0;
		top: 50;     
        width: 100%;
        height: 100%;
        background-color: white;
    }
</style>