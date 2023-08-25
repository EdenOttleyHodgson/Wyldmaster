import type { Compendium, getCompendium } from "$lib/compendium/compendiumloader"
import { error } from "@sveltejs/kit"
import type { ItemRef } from "$lib/compendium/compendiumclasses/_CompendiumStore"
export class Character {
    static compendium: Compendium
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
        let originalSubclass = Character.compendium.subclassStore.getItem((originalSubclassID).class_id)
        let combatStats
        if(originalSubclass) {
            combatStats = Character.compendium.baseClassStore.getItem(originalSubclass?.baseclass)?.stats
        } else {throw new Error("Subclass did not exist!")}
        
        let abilities: string[] = []
        let className: string = ""
        this.staticInfo.classes.forEach((x) => {
            let currentClass = Character.compendium.subclassStore.getItem(x.class_id)
            className += currentClass?.name
            currentClass?.abilities
                .filter((ability) => ability.level <= x.level)
                .forEach(ability => {
                    abilities.push(ability.id)
                });
        })
        if(combatStats) {
            return {
                combatStats,
                className,
                abilities,
                actions: []
            }
        }
        throw new Error("Info could not be derived!")
    }
    updateActions(): string[] {
        let actions: string[] = []
        Character.compendium.actionStore.items.filter((x) => x.source.id === "universal").forEach((item) => {
            actions.push(item.id)
        })
        this.staticInfo.inventory.filter((x) => x.compType ==="EXCURSIONEQUIPMENT").forEach((x) => {
            let item = Character.compendium.excursionEquipmentStore.getItem(x.id)
            if(item) {
                actions.push(...item.actions)
            }
        })
        this.derivedInfo.abilities
            .map(x => Character.compendium.abilityStore.getItem(x))
            .forEach(x => {
                if(x)
                {
                    actions.push(...x.actions)
                }
            })
            
        return actions
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
    abilities: string[]
    actions: string[]
}