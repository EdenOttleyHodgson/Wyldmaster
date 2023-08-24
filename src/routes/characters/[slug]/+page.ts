import { getCharacterById } from '$lib/charactercreator/classes/CharacterStore.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const ssr = false;
export const load: PageLoad = ({params}) => {
    let character = getCharacterById(params.slug)
    if(character){
        return {
            character
        }
    }
    throw error(404)
}