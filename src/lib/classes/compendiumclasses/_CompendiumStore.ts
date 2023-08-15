import type { CompendiumType } from "../utilityTypes";

export interface CompendiumObject{
    id: string,
    name: string,
    
}

export interface Source{
    id: string,
    SourceType: CompendiumType | "UNIVERSAL"
}

export abstract class CompendiumStore{
    items: CompendiumObject[];
    constructor(items: CompendiumObject[]){
        this.items = items

    }
    getItem(itemID: string): CompendiumObject | undefined{
       return this.items.find((x) => {x.id === itemID})
    } 
}