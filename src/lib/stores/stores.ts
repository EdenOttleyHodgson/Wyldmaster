import { readable, writable } from "svelte/store"

import {readDir, BaseDirectory} from "@tauri-apps/api/fs"
import {convertFileSrc} from "@tauri-apps/api/tauri"
export async function loadImages(): Promise<string[]> {
    let image_list: string[] = []
    const images_in_cache = await readDir('assets',
        {
            dir: BaseDirectory.Resource,
            recursive: false
        });
    images_in_cache.forEach(async (entry) => {
    image_list.push(convertFileSrc(entry.path))
    })
    return image_list
}
export const images = readable(await loadImages())