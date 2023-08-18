<p>baseclass</p>
<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumBaseClass } from "$lib/classes/compendiumclasses";

 
    export let itemID: string
    let item: CompendiumBaseClass | undefined
    let compendium: Compendium
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.baseClassStore.getItem(itemID)
    })
</script>