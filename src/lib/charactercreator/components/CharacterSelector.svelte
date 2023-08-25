<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Character } from "../classes/CharacterClass";

    export let character: Character
    function selectThisCharacter(){
        dispatch('CharacterSelected', character.staticInfo.id)
    }
    const dispatch = createEventDispatcher<{CharacterSelected:string}>();

</script>



<div role="button" tabindex="0" on:click={selectThisCharacter} on:keydown={(e) => {if (e.key === "Enter"){selectThisCharacter}}}>
        <p>{character.staticInfo.name}</p>
        <p>Level: {character.staticInfo.level}</p>
        <p>Class: {character.derivedInfo.className}</p>
        
</div>
<style>
    div {
        border: 2px solid green;
        margin: 5px
    }
    div:hover {
        color: darkgrey
    }
</style>




