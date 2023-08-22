import { Compendium, getCompendium } from "$lib/compendium/compendiumloader"
import type { ItemRef } from "../compendium/compendiumclasses/_CompendiumStore"
let compendium: Compendium = await getCompendium()
export class Character {
    staticInfo: StaticInfo
    derivedInfo: DerivedInfo
    constructor(staticInfo: StaticInfo){
        this.staticInfo = staticInfo
        this.derivedInfo = this.deriveInfo()

    }

    deriveInfo(): DerivedInfo{
        let subclass = compendium.subclassStore.getItem((this.staticInfo.classes.filter((x) => x.original)[0].class_id))
        let stats
        if(subclass) {
            stats = compendium.baseClassStore.getItem(subclass?.baseclass)?.stats
        } else {throw new Error("Subclass did not exist!")}
        
        
        console.log(stats)
        if(stats) {
            return {
                combatStats: stats
            }
        }
        throw new Error("Info could not be derived!")
    }
}


export interface CombatInfo{
    stats: CombatStats
}

export interface CombatStats{
        stamina: number,
        meleeprof: number,
        rangedprof: number,
        magicprof: number,
        dodge: number,
        resilience: number,
        magicdef: number
}



export interface StaticInfo{

    id: string
    name: string
    level: number
    player_name: string
    appearance: string
    notes: string
    background: string
    classes: {class_id: string, level: number, original: boolean}[]
    inventory: ItemRef[]

}

export interface DerivedInfo{
    combatStats: CombatStats
}