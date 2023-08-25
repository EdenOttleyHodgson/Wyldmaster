import { invoke } from "@tauri-apps/api/tauri";
import { Character, type StaticInfo } from "./CharacterClass";
import { getCompendium, load_compendium_data } from "$lib/compendium/compendiumloader";

let characterStore: Character[] = []
let loaded: boolean = false;

async function load_characters() {
    let loadedChars = await invoke("load_all_characters") as string[]
    let compendium = await getCompendium()
    Character.compendium = compendium
    loadedChars.forEach((unparsedData) => {
        let charData = JSON.parse(unparsedData) as StaticInfo
        let newChar = new Character(charData)
        characterStore.push(newChar)
    })
    loaded = true;
}


export async function getCharacterStore(){
    if(!loaded){
        await load_characters()
    }
    return characterStore;
} 

export function getCharacterById(id: string): Character | undefined {
    return characterStore.find((x) => x.staticInfo.id === id)
}