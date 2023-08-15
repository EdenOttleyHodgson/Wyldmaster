import type CompendiumObject from "./_CompendiumObject";

export default interface CompendiumCombatGear extends CompendiumObject{
    stats: {
        damage: number[],
        weight: number,
        apcost: number[],
    }
    tags: string[]
}