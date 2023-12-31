import type { CompendiumObject }from "./_CompendiumStore";

export interface CompendiumCombatGear extends CompendiumObject{
    stats: armourStats | weaponStats
    tags: string[]
}


export interface armourStats{
    weight: number,
    resilience: number,
    dodge: number,
    staminareduction: number


}

export interface weaponStats{
        range: string,
        damage: number[],
        weight: number,
        apcost: number[]
}

export function isWeapon(stats: armourStats | weaponStats): stats is weaponStats {
    return 'damage' in stats;
}
export function isArmour(stats: armourStats | weaponStats): stats is armourStats {
    return 'dodge' in stats;
}