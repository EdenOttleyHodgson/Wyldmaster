<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Character } from "$lib/charactercreator/classes/CharacterClass";
    import { getCharacterStore } from "$lib/charactercreator/classes/CharacterStore";
    import CharacterSelector from "$lib/charactercreator/components/CharacterSelector.svelte";
    import { onMount } from "svelte";

    let characterStore: Character[] = []
    onMount(async () => {
        characterStore = await getCharacterStore()
    })
    function handleCharacterSelected(e: CustomEvent<string>){
        goto("characters/" + e.detail)
    }
</script>

<h1>CHARACTERS</h1>
{#each characterStore as character }
    <CharacterSelector character={character} on:CharacterSelected={handleCharacterSelected}/>
{/each}
