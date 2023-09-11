<script lang="ts">
    import CompendiumView from "$lib/compendium/CompendiumView.svelte";
    import type { CompendiumSubclass } from "$lib/compendium/compendiumclasses";
    import type { ItemRef } from "$lib/compendium/compendiumclasses/_CompendiumStore";
    import { getCompendium, type Compendium } from "$lib/compendium/compendiumloader";
    import { onMount } from "svelte";
    import type { Character } from "../classes/CharacterClass";
    import { goto } from "$app/navigation";
    import { saveCharacter } from "../classes/CharacterStore";
    export let data;
    let newClass: CompendiumSubclass;
    let compendium: Compendium;
    let character = data.character as Character

    function updateItemToAdd(e: CustomEvent<ItemRef>){
        let newClassMaybe = compendium.subclassStore.getItem(e.detail.id)
        if (newClassMaybe) {
            newClass = newClassMaybe
        }
    }
    onMount(async () => {
        compendium = await getCompendium()
    })
    function finishLevelUp(){
        let currentClass = character.staticInfo.classes.find((x) => x.class_id == newClass.id)  
        if (currentClass) {
            currentClass.level++
        } else {
            character.staticInfo.classes.push({class_id: newClass.id, level: 1, original: false})
        }
        character.staticInfo.level++
        character.derivedInfo = character.deriveInfo();
        saveCharacter(character).then(() => {
            goto("/characters/" + character.staticInfo.id);
        })
    }
</script>
<div style="position:absolute; top: 20px">
    <div style="border: 2px solid black; height: 90vh">
        <CompendiumView compendiumType="SUBCLASSES" on:ItemSelected={updateItemToAdd}/>
    </div>
    <div style="display: flex;">
        {#if newClass}
            <button on:click={finishLevelUp}>Select : {newClass.name}</button>
        {/if}
        <button on:click={() => goto("characters/" + character.staticInfo.id)}>Cancel</button>
    </div>
</div>