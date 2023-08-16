import type { CompendiumObject }from "./_CompendiumStore";

export interface CompendiumCombatGear extends CompendiumObject{
    stats: {
        damage: number[],
        weight: number,
        apcost: number[],
    }
    tags: string[]
}
