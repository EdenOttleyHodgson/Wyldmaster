<script lang="ts">
    import type { CompendiumSubclass } from "$lib/compendium/compendiumclasses";
    import { getCompendium, type Compendium } from "$lib/compendium/compendiumloader";
    import { onMount } from "svelte";
    import { Character, type StaticInfo } from "../classes/CharacterClass";
    import {v4 as uuidv4} from 'uuid';
    import { saveCharacter } from "../classes/CharacterStore";
    import { goto } from "$app/navigation";
    let compendium: Compendium
    let name: string
    let appearance: string
    let background: string
    let playerName: string
    let notes: string
    onMount(async () => {
        compendium = await getCompendium()
        console.log(compendium)
    })
    let selected_class: CompendiumSubclass
    async function createCharacter(){
        console.log(selected_class)
        let id = uuidv4()
        let charInfo: StaticInfo = {
            id,
            name,
            appearance,
            background,
            player_name: playerName,
            notes,
            classes: [{class_id: selected_class.id, level: 1, original: true}],
            level: 1,
            inventory: []
        }
        await saveCharacter(new Character(charInfo))
        goto("/characters")
    }
</script>

{#await getCompendium() then compendium }
<div>
    <div>
        <div>
            <p>Name</p>
            <input bind:value={name}/>
        </div>
        <div>
            <p>Appearance</p>
            <input bind:value={appearance}/>
        </div>
        <div>
            <p>Background</p>
            <input bind:value={background}/>
        </div>
        <div>
            <p>Player Name</p>
            <input bind:value={playerName}/>
        </div>
        <div>
            <p>Notes</p>
            <input bind:value={notes}/>
        </div>
        <div>
            <p>Class</p>
            <select bind:value={selected_class}>
                {#each compendium.subclassStore.items as subclass}
                    <option value={subclass}>
                        {subclass.name}
                    </option>
                {/each}
            </select>
        </div>
    </div>
    <button on:click={createCharacter}>Create Character</button>
</div>
{/await}