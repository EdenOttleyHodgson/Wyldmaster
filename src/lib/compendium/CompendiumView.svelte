<script lang="ts">
    import { onMount } from "svelte";
    import type { CompendiumType } from "$lib/classes/utilityTypes";
    import { Compendium, getCompendium } from "./compendiumloader";
    import type { CompendiumObject } from "$lib/classes/compendiumclasses";
    export let compendiumType: CompendiumType 
    let compendium: Compendium;
    let currentItems: CompendiumObject[]
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
