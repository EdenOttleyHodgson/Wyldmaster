{#if item}
    <h1>{item.name}</h1>
    <p>{item.flavour}</p>
    <p>{item.description}</p>
    <div>
        {#each item.abilities as ability }
            <div>
                <p>Level {ability.level}</p>
                <ItemSelector id ={ability.id} compType ="ABILITIES" on:ItemSelected/>
            </div>
        {/each}
    </div>
    {#if item.featureTable}
        <FeatureTableView featureTable={item.featureTable}/>
    {/if}
    <p>Base Class</p>
    <ItemSelector id={item.baseclass} compType="BASECLASSES" on:ItemSelected/>
{/if}
<script lang="ts">
    import { onMount } from "svelte";
    import { type Compendium, getCompendium } from "../compendiumloader";
    import type { CompendiumSubclass } from "$lib/compendium/compendiumclasses";
    import DetailedItemView from "../DetailedItemView.svelte";
    import ItemSelector from "../ItemSelector.svelte";
    import FeatureTableView from "./FeatureTableView.svelte";

    export let itemID: string
    let item: CompendiumSubclass | undefined
    let compendium: Compendium
    let featureTableHeaders: string[]
    let featureTableContents: string[][]
    onMount(async () => {
        compendium = await getCompendium()
        item = compendium.subclassStore.getItem(itemID)
        if(item?.featureTable){
            featureTableHeaders = item.featureTable.table[0]
            featureTableContents = item.featureTable.table.slice(1)
        }
    })

</script>
