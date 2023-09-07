
import {invoke} from "$lib/tauriFix"
import { Character, type StaticInfo } from "./CharacterClass";
import { getCompendium, load_compendium_data } from "$lib/compendium/compendiumloader";
let characterStore: Character[] = []
let loaded: boolean = false;

export async function load_characters() {
    characterStore = []
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


export async function saveCharacter(character: Character){
    await invoke("save_character", {characterInfo: character.staticInfo, id:character.staticInfo.id})
    await load_characters()
}
