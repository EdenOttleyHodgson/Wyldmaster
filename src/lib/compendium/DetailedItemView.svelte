<script lang="ts">
    import type { CompendiumType } from "./CompendiumType";
    import ActionView from "./views/ActionView.svelte";
    import AbilityView from "./views/AbilityView.svelte";
    import BaseClassView from "./views/BaseClassView.svelte";
    import CombatGearView from "./views/CombatGearView.svelte";
    import SubclassView from "./views/SubclassView.svelte";
    import TagView from "./views/TagView.svelte";
    import ExcursionEquipmentView from "./views/ExcursionEquipmentView.svelte";
    export let itemRef: {itemID: string, compType: CompendiumType}
    let itemID = itemRef.itemID
    let CompType = itemRef.compType
</script>


{#if CompType === "ACTIONS"}
    <ActionView itemID={itemID}></ActionView>
{:else if CompType ==="BASECLASSES"}
    <BaseClassView itemID={itemID}></BaseClassView>
{:else if CompType ==="COMBATGEAR"}
    <CombatGearView itemID={itemID}></CombatGearView>
{:else if CompType ==="EXCURSIONEQUIPMENT"}
    <ExcursionEquipmentView itemID={itemID}></ExcursionEquipmentView>
{:else if CompType ==="TAGS"}
    <TagView itemID={itemID}></TagView>
{:else if CompType ==="SUBCLASSES"}
    <SubclassView itemID={itemID}></SubclassView>
{:else if CompType ==="ABILITIES"}
    <AbilityView itemID={itemID}></AbilityView>
{/if}