<script lang="ts">
    import { goto } from "$app/navigation";
    import {resolveResource} from "@tauri-apps/api/path"
    import { onMount } from "svelte";
    import { images } from "$lib/stores/stores";
    import { app } from "@tauri-apps/api";
    export let text: string
    export let image: {
        url: string
        alt: string
    }
    export let destination: string
    let imagePath: string | undefined
    let imageList: string[]

    onMount(async() => {
         imagePath = await resolveResource("assets/"+ image.url)
         images.subscribe((x) => {
            imageList = x
         })
         imagePath = imageList.find((x) => {
            let splitPath = x.split("%5C")
            return splitPath[splitPath.length - 1] === image.url
         })
    })




</script>

<style>
    .menu-option{
     border: 5px solid black;
     margin: 10px;
     padding: 10px;
     width: 100%;
     align-items: center;
     justify-content: center;
     text-align: center;
    }

</style>

<div class="menu-option" on:click={() => goto(destination)} on:keydown={() => goto(destination)} role="button" tabindex=0>
    <img src={imagePath} alt={image.alt}/>
    <p>{text}</p>
</div>