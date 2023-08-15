import { invoke } from "@tauri-apps/api/tauri"
import type { CompendiumType } from "$lib/classes/utilityTypes"
import type { CompendiumBaseClass, CompendiumExcursionEquipment,  CompendiumCombatGear,  CompendiumTag,  CompendiumAbility,  CompendiumSubclass, CompendiumAction } from "$lib/classes/compendiumclasses"
import { CompendiumAbilityStore, CompendiumActionStore, CompendiumBaseClassStore, CompendiumCombatGearStore, CompendiumExcursionEquipmentStore, CompendiumSubclassStore, CompendiumTagStore } from "$lib/classes/compendiumclasses"
let compendium: Compendium
export class Compendium{
    abilityStore!: CompendiumAbilityStore
    actionStore!: CompendiumActionStore 
    baseClassStore!: CompendiumBaseClassStore
    combatGearStore!: CompendiumCombatGearStore
    excursionEquipmentStore!: CompendiumExcursionEquipmentStore
    subclassStore!: CompendiumSubclassStore
    tagStore!: CompendiumTagStore    
    constructor(data: recieved_data[]) {
        console.log(data)
        data.forEach((x) => {
            switch (x.compendium_type) {
            case "ACTIONS":
                this.actionStore = new CompendiumActionStore(JSON.parse(x.data) as CompendiumAction[])
                break;
            case "BASECLASSES":
                this.baseClassStore = new CompendiumBaseClassStore(JSON.parse(x.data) as CompendiumBaseClass[])
                break;
            case "EXCURSIONEQUIPMENT":
                this.excursionEquipmentStore = new CompendiumExcursionEquipmentStore(JSON.parse(x.data) as CompendiumExcursionEquipment[])
                break;
            case "COMBATGEAR": 
                this.combatGearStore = new CompendiumCombatGearStore(JSON.parse(x.data) as CompendiumCombatGear[])
            case "TAGS":
                this.tagStore = new CompendiumTagStore(JSON.parse(x.data) as CompendiumTag[])
                break;
            case "ABILITIES":
                this.abilityStore = new CompendiumAbilityStore(JSON.parse(x.data) as CompendiumAbility[]) 
                break;
            case "SUBCLASSES": 
                this.subclassStore = new CompendiumSubclassStore(JSON.parse(x.data) as CompendiumSubclass[])
                break;
            }
        }
        )
            console.log("Compendium Initialized")
    }
}    

export async function getCompendium(){
    if(!compendium) {
        await load_compendium_data()
    }
    return compendium;
}

    


interface recieved_data{
    compendium_type: CompendiumType
    data: string
}
export async function load_compendium_data() {
    const data = await invoke("load_compendium_data") as recieved_data[]
    compendium = new Compendium(data)
}
