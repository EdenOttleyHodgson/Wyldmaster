<script lang="ts">
    import { goto } from "$app/navigation";
    export let text: string
    export let image: {
        url: string
        alt: string
    }
    export let destination: string
    const imageLocation = "src/assets/images/"
</script>

<style>
    .menu-option{
     border: 5px solid black;
     margin: 10px;
     padding: 10px
    }

</style>

<div class="menu-option" on:click={() => goto(destination)} on:keydown={() => goto(destination)} role="button" tabindex=0>
    <img src={imageLocation + image.url} alt={image.alt}/>
    <p>{text}</p>
</div>