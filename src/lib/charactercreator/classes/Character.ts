import { Compendium, getCompendium } from "$lib/compendium/compendiumloader"
import { error } from "@sveltejs/kit"
import type { ItemRef } from "../../compendium/compendiumclasses/_CompendiumStore"
let compendium: Compendium = await getCompendium()
export class Character {
    staticInfo: StaticInfo
    derivedInfo: DerivedInfo
    constructor(staticInfo: StaticInfo){
        this.staticInfo = staticInfo
        this.derivedInfo = this.deriveInfo()

    }

    deriveInfo(): DerivedInfo{
        let originalSubclassID = this.staticInfo.classes.find(x => x.original)
        if(!originalSubclassID) {
            throw new Error("Character missing original subclass!")
        }
        let originalSubclass = compendium.subclassStore.getItem((originalSubclassID).class_id)
        let combatStats
        if(originalSubclass) {
            combatStats = compendium.baseClassStore.getItem(originalSubclass?.baseclass)?.stats
        } else {throw new Error("Subclass did not exist!")}
        
        let className: string = ""
        this.staticInfo.classes.forEach((x) => {
            className += compendium.subclassStore.getItem(x.class_id) + " " + x.level
        })
        console.log(combatStats)
        if(combatStats) {
            return {
                combatStats,
                className
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
    className: string
}