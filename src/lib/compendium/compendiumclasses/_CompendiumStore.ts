import type { CompendiumType } from "../CompendiumType";

export interface CompendiumObject{
    id: string,
    name: string,
    
}

export interface Source{
    id: string,
    sourceType: CompendiumType | "UNIVERSAL"
}

export interface ItemRef{
    id: string,
    compType: CompendiumType

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