import { get } from "svelte/store"
import type{ CompendiumObject, Source }from "./_CompendiumStore"
import type { Compendium } from "$lib/compendium/compendiumloader"

export  interface CompendiumExcursionEquipment extends CompendiumObject{
    weight: number,
    actions: string[],
    source: Source,
    effect: string
}
