import { getCharacterById } from '$lib/charactercreator/classes/CharacterStore.js';
import { error } from '@sveltejs/kit';

export function load({params: any}){
    //@ts-ignore
    const character = getCharacterById(params.slug)
    if(!character) throw error(404);
    return {character}
}