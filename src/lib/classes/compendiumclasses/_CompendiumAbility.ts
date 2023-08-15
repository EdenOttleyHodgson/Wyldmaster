import {CompendiumStore, type CompendiumObject }from "./_CompendiumStore";

export interface CompendiumAbility extends CompendiumObject{
    effect: string,
    actions: string[],
    source: string
}

export class CompendiumAbilityStore extends CompendiumStore {
    constructor(items: CompendiumAbility[]){
        super(items)
    }

    getItem(itemID: string): CompendiumAbility | undefined{
        return super.getItem(itemID) as CompendiumAbility | undefined
    }
}