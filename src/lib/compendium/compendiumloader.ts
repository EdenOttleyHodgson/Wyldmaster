import {invoke} from "$lib/tauriFix"
import type { CompendiumType } from "$lib/compendium/CompendiumType"
import { type CompendiumBaseClass, type CompendiumExcursionEquipment,  type CompendiumCombatGear,  type CompendiumTag,  type CompendiumAbility,  type CompendiumSubclass, type CompendiumAction, CompendiumStore, type CompendiumObject } from "$lib/compendium/compendiumclasses"
import { Character } from "$lib/charactercreator/classes/CharacterClass"
let compendium: Compendium
export class Compendium{
    actionStore!: CompendiumStore<CompendiumAction>
    baseClassStore!: CompendiumStore<CompendiumBaseClass>
    excursionEquipmentStore!: CompendiumStore<CompendiumExcursionEquipment>
    combatGearStore!: CompendiumStore<CompendiumCombatGear>
    tagStore!: CompendiumStore<CompendiumTag>
    abilityStore!: CompendiumStore<CompendiumAbility>
    subclassStore!: CompendiumStore<CompendiumSubclass>
    constructor(data: recieved_data[]) {
        data.forEach((x) => {
            switch (x.compendium_type) {
            case "ACTIONS":
                this.actionStore = new CompendiumStore<CompendiumAction>(JSON.parse(x.data) as CompendiumAction[])
                console.log(this.actionStore)
                break;
            case "BASECLASSES":
                this.baseClassStore = new CompendiumStore<CompendiumBaseClass>(JSON.parse(x.data) as CompendiumBaseClass[])
                break;
            case "EXCURSIONEQUIPMENT":
                this.excursionEquipmentStore = new CompendiumStore<CompendiumExcursionEquipment>(JSON.parse(x.data) as CompendiumExcursionEquipment[])
                break;
            case "COMBATGEAR": 
                this.combatGearStore = new CompendiumStore<CompendiumCombatGear>(JSON.parse(x.data) as CompendiumCombatGear[])
            case "TAGS":
                this.tagStore = new CompendiumStore<CompendiumTag>(JSON.parse(x.data) as CompendiumTag[])
                break;
            case "ABILITIES":
                this.abilityStore = new CompendiumStore<CompendiumAbility>(JSON.parse(x.data) as CompendiumAbility[]) 
                break;
            case "SUBCLASSES": 
                this.subclassStore = new CompendiumStore<CompendiumSubclass>(JSON.parse(x.data) as CompendiumSubclass[])
                break;
            }
        }
        )
            console.log("Compendium Initialized")
    }
    getGenericItem(itemID: string, compType: CompendiumType): CompendiumObject | undefined{
        try {
            switch(compType) {
                case "ACTIONS":
                    return this.actionStore.getItem(itemID)
                case "BASECLASSES":
                    return this.baseClassStore.getItem(itemID)
                case "COMBATGEAR":
                    return this.combatGearStore.getItem(itemID) 
                case "EXCURSIONEQUIPMENT":
                    return this.excursionEquipmentStore.getItem(itemID) 
                case "TAGS":
                    return this.tagStore.getItem(itemID) 
                case "SUBCLASSES":
                    return this.subclassStore.getItem(itemID) 
                case "ABILITIES":
                    return this.abilityStore.getItem(itemID) 
            }
        } catch (error) {
            console.error(error + "\n compType did not correspond to T")
            return undefined 
        }    
    }
}    

export async function getCompendium(){
    if(!compendium) {
        await load_compendium_data()
        Character.compendium = compendium
    }
    return compendium;
}

    


interface recieved_data{
    compendium_type: CompendiumType
    data: string
}
export async function load_compendium_data() {
    const data = await invoke("load_compendium_data") as recieved_data[]
    console.log(data)
    compendium = new Compendium(data)
}


export function itemIdArrToItemString(idArr: string[], compType: CompendiumType): string {
    let itemArr: string[] = []
    idArr.forEach((id) => {
        let item = compendium.getGenericItem(id, compType)
        if(item) {
            itemArr.push(item.name)
        }
    })
    return itemArr.toString()
}