<h1>COMPENDIUM</h1>
<div>
    <div class="innerdiv">
        <MenuOption text="Combat Gear" image={{url: "placeholder.jpg", alt: "placeholder"}} destination="./compendium/combatgear"/>
        <MenuOption text="Classes" image={{url: "placeholder.jpg", alt: "placeholder"}} destination="./compendium/classes"/>
    </div>
    <div class="innerdiv">
        <MenuOption text="Excursion Equipment" image={{url: "placeholder.jpg", alt: "placeholder"}} destination="./compendium/excursionequipment"/>
        <MenuOption text="Actions" image={{url: "placeholder.jpg", alt: "placeholder"}} destination="./compendium/actions"/>
    </div>
    <div class="innerdiv">
        <MenuOption text="Tags" image={{url: "placeholder.jpg", alt: "placeholder"}} destination="./compendium/tags"/>
    </div>
</div>
<script lang="ts">
    import MenuOption from "$lib/menus/MenuOption.svelte";
</script>

<style>
    .innerdiv{
        display: flex;
        width: 70vw;
        margin: auto;
        justify-content: space-between;
    }

</style>