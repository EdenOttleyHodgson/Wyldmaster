import { invoke } from "@tauri-apps/api/tauri"
import type { CompendiumType } from "$lib/classes/utilityTypes"
import { type CompendiumBaseClass, type CompendiumExcursionEquipment,  type CompendiumCombatGear,  type CompendiumTag,  type CompendiumAbility,  type CompendiumSubclass, type CompendiumAction, CompendiumStore } from "$lib/classes/compendiumclasses"
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
        console.log(data)
        data.forEach((x) => {
            switch (x.compendium_type) {
            case "ACTIONS":
                this.actionStore = new CompendiumStore<CompendiumAction>(JSON.parse(x.data) as CompendiumAction[])
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
