import { invoke } from "@tauri-apps/api/tauri"
import type {CompendiumAbility, CompendiumBaseClass, CompendiumCombatGear, CompendiumExcursionEquipment, CompendiumObject, CompendiumSubclass, CompendiumTag} from "$lib/classes/compendiumclasses"
import type { CompendiumType } from "$lib/classes/utilityTypes"
let compendium_data: CompendiumObject[]
interface recieved_data{
    compendium_type: CompendiumType
    data: string
}
export async function load_compendium_data() {
    const data = await invoke("load_compendium_data") as recieved_data[]
    console.log(data)
    data.forEach((x) => {
        console.log(x.compendium_type + ": \n" + x.data)
        let currentData = JSON.parse(x.data)
        console.log(currentData)
    })

}
