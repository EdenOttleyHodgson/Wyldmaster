<script lang="ts">
    import type { Character } from "$lib/charactercreator/Character";
    import { getCharacterStore } from "$lib/charactercreator/CharacterStore";
    import { onMount } from "svelte";

    let characterStore: Character[]
    onMount(async () => {
        characterStore = await getCharacterStore()
        console.log(characterStore)
    })
</script>

<h1>DO CHARACTER CREATOR</h1>
