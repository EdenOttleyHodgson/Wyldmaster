
export const ssr = false;
export const prerender = false;



import { getCharacterById } from '$lib/charactercreator/classes/CharacterStore.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load: PageLoad = ({params}: any) => {
    let character = getCharacterById(params.slug)
    if(character){
        return {
            character
        }
    }
    throw error(404)
}