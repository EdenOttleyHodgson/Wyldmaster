import type { CompendiumType } from "../utilityTypes";

export interface CompendiumObject{
    id: string,
    name: string,
    
}

export interface Source{
    id: string,
    SourceType: CompendiumType | "UNIVERSAL"
}



export class CompendiumStore<T extends CompendiumObject> {
    items: T[]
    constructor(items: T[]) {
        this.items = items;
    }
    getItem(itemID: string): T | undefined {
        return this.items.find((x) => x.id === itemID)
    }
    

}