<script lang="ts">
    import { onMount } from "svelte";
    import type { CompendiumType } from "$lib/classes/utilityTypes";
    import { getCompendium } from "./compendiumloader";
    export let compendiumType: CompendiumType 
    let compendium;
    const loadContent = async function(){
        compendium = await getCompendium();
        console.log(compendium)
        switch(compendiumType){
            case "ACTIONS":
                console.log("Loading Actions")
                break;
            case "BASECLASSES":
                console.log("Loading Classes")
                break;
            case "EXCURSIONEQUIPMENT":
                console.log("Loading Excursion Equipment")
                break;
            case "COMBATGEAR":
                console.log("Loading Combat Gear")
                break;
            case "TAGS":
                console.log("Loading Tags")
                break;
        }
    }
    onMount(loadContent)
</script>
