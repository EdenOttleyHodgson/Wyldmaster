import { get } from "svelte/store"
import {CompendiumStore, type CompendiumObject, type Source }from "./_CompendiumStore"
import type { Compendium } from "$lib/compendium/compendiumloader"

export  interface CompendiumExcursionEquipment extends CompendiumObject{
    weight: number,
    actions: string[]
    source: Source
}

export class CompendiumExcursionEquipmentStore extends CompendiumStore{
    constructor(items: CompendiumExcursionEquipment[]){
        super(items)
    }
    getItem(itemID: string): CompendiumExcursionEquipment | undefined {
        return super.getItem(itemID) as CompendiumExcursionEquipment | undefined
    }
           
    
}