import { CompendiumStore, type CompendiumObject }from "./_CompendiumStore";

export interface CompendiumCombatGear extends CompendiumObject{
    stats: {
        damage: number[],
        weight: number,
        apcost: number[],
    }
    tags: string[]
}

export class CompendiumCombatGearStore extends CompendiumStore {
    constructor(items: CompendiumCombatGear[]) {
        super(items)
    }
    getItem(itemID: string): CompendiumCombatGear | undefined {
        return super.getItem(itemID) as CompendiumCombatGear | undefined
    }
}