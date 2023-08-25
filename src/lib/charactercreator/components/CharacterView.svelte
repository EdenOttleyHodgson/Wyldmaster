<script lang="ts">
    import { Character } from "$lib/charactercreator/classes/CharacterClass";
    import CharacterSelector from "$lib/charactercreator/components/CharacterSelector.svelte";
    import CompendiumView from "$lib/compendium/CompendiumView.svelte";
    import DetailedItemView from "$lib/compendium/DetailedItemView.svelte";
    import ItemSelector from "$lib/compendium/ItemSelector.svelte";
    import type { CompendiumAbility } from "$lib/compendium/compendiumclasses";
    import type { ItemRef, Source } from "$lib/compendium/compendiumclasses/_CompendiumStore.js";
    import { getCompendium, type Compendium } from "$lib/compendium/compendiumloader.js";
    import AbilityView from "$lib/compendium/views/AbilityView.svelte";
    import CombatGearView from "$lib/compendium/views/CombatGearView.svelte";
    import ExcursionEquipmentView from "$lib/compendium/views/ExcursionEquipmentView.svelte";
    import { appLocalDataDir } from "@tauri-apps/api/path";
    import { invoke } from "@tauri-apps/api/tauri";
    import { onMount } from "svelte";
    import { derived } from "svelte/store";
    import { load_characters } from "../classes/CharacterStore";
    export let data
    let inventoryKey = false
    let character = data.character as Character
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
        character.derivedInfo.actions = character.updateActions()
    })
    function handleItemSelected(e:CustomEvent<ItemRef>){
        console.log("item selected")
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
    async function saveCharacter(){
        await invoke("save_character", {characterInfo: character.staticInfo, id:character.staticInfo.id, dataDir: await appLocalDataDir()})
        await load_characters()
    }
    function getAbilitySource(id: string):{name:string, level:number} {
        let ability = Character.compendium.getGenericItem(id, "ABILITIES") as CompendiumAbility
        if(ability.source.id != "universal"){
            let sourceItem = Character.compendium.getGenericItem(ability.source.id, ability.source.sourceType)
            if(sourceItem) {
                return {name:sourceItem.name, level: ability.level}
            }
        }
        return{name: "BAD!", level: 0}
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
            <div class="item-view">
                <DetailedItemView itemRef={currentItemRef} on:ItemSelected{handleItemSelected}/>
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
                <div class="inventory-add-buttonbar">
                    <button on:click={() => CombatGearOrEquipment = "COMBATGEAR"}>Combat Gear</button>
                    <button on:click={() => CombatGearOrEquipment = "EXCURSIONEQUIPMENT"}>Excurstion Equipment</button>
                </div>
                {#if CombatGearOrEquipment === "COMBATGEAR"}
                    <CompendiumView compendiumType = {"COMBATGEAR"} on:ItemSelected = {updateItemToAdd}/>
                {:else if CombatGearOrEquipment === "EXCURSIONEQUIPMENT"}
                    <CompendiumView compendiumType = {"EXCURSIONEQUIPMENT"} on:ItemSelected ={updateItemToAdd}/>
                {/if}
                <div class="inventory-add-buttonbar">
                    <button on:click={addItemToInventory}>Add Selected Item To Inventory</button>
                    <button on:click={() => showingInventoryAddScreen = false}>Cancel</button>
                </div>
            </div>
        </div>
{:else}
<div class="border-div">
    <div class="top-div">
            <p>Name: {character.staticInfo.name}</p>
            <p>|Level: {character.staticInfo.level} </p>
            <p>|Classes: {character.derivedInfo.className} </p>
            <p>|Player Name: {character.staticInfo.player_name} </p>
    </div>
    <div class="middle-div flex-div">
        <div class="left-div">
            <div class="actions-status-div">
                <div class="stats-div">
                    <h3>Stats</h3>
                    <p>Max Stamina: {character.derivedInfo.combatStats.stamina}</p>
                    <p>Dodge: {character.derivedInfo.combatStats.dodge}</p>
                    <p>Resilience: {character.derivedInfo.combatStats.resilience}</p>
                    <p>Magic Defence: {character.derivedInfo.combatStats.magicdef}</p>
                    <p>Melee Proficiency: {character.derivedInfo.combatStats.meleeprof}</p>
                    <p>Ranged Proficiency: {character.derivedInfo.combatStats.rangedprof}</p>
                    <p>Magic Proficiency: {character.derivedInfo.combatStats.magicprof}</p>
                    <h3>Abilities</h3>
                    {#each character.derivedInfo.abilities as ability }
                        <p>Level: {getAbilitySource(ability).level} {getAbilitySource(ability).name} </p>
                
                        <ItemSelector id={ability} compType="ABILITIES" on:ItemSelected={handleItemSelected}/>
                    {/each}
                </div>
                <div class="actions-div">
                    <h3>Actions</h3>
                    {#each character.derivedInfo.actions as action }
                        <ItemSelector id={action} compType="ACTIONS" on:ItemSelected={handleItemSelected}/>
                    {/each}
                </div>
            </div>
            <div class="navbar-div">
                <button on:click={saveCharacter}>Save</button>
            </div>

        </div>
        <div class="inventory-div">
            <p>Weight: {currentWeight} / {maxWeight}</p>
            {#key inventoryKey}
                {#each character.staticInfo.inventory as item}
                <div class="inventory-item">
                    <div style="width: 80%"><ItemSelector id={item.id} compType={item.compType} on:ItemSelected={handleItemSelected}/></div>
                    <button style="height: 55px" on:click={()=>removeInventoryItem(item)}>Remove</button>
                </div>
                {/each}
            {/key}
            <button style="width:95%" on:click={() => {showingInventoryAddScreen = true}}>Add To Inventory</button>
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
        margin: 5px;
        
    }
    .top-div{
        height: 5dvh;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid black;
    }
    .inventory-item{
        display: flex;
        justify-content: space-evenly;
        align-items: center
    }
    .left-div{
        width: 60%;
    }
    .inventory-div{
        text-align: center;
        width: 40%;
        border: 3px solid black;
        align-items: center;
        justify-content: center;
    }
    .navbar-div{
        height: 5%;
        border: 3px solid black;
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
        overflow-y:scroll;
        border: 3px solid black;
    }
    .actions-div{
        width: 50%;
        overflow-y:scroll;
        border: 3px solid black;
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
    .inventory-add-buttonbar{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .item-view{
        border: 3px solid black
    }
</style>