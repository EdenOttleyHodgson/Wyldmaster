
<h1>WYLDMASTER</h1>
<div class="menu-options">
    <MenuOption text="Compendium" image={{url: "CompendiumIcon.png", alt:"Compendium Icon"}} destination="./compendium"></MenuOption>
    <MenuOption text="Characters" image={{url: "CharacterIcon.png", alt:"Character Icon"}} destination="./characters"></MenuOption>
</div>

<script lang="ts">
    import MenuOption from '$lib/menus/MenuOption.svelte';
</script>

<style>
    .menu-options{
        display: flex;
    }

</style>