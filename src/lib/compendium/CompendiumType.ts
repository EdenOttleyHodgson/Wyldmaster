import type { CompendiumAbility, CompendiumAction, CompendiumBaseClass, CompendiumCombatGear, CompendiumExcursionEquipment, CompendiumObject, CompendiumSubclass, CompendiumTag } from "$lib/classes/compendiumclasses";

export type CompendiumType = 
    "ACTIONS"
    |"BASECLASSES"
    |"COMBATGEAR"
    |"EXCURSIONEQUIPMENT"
    |"TAGS"
    |"SUBCLASSES"
    |"ABILITIES"

export function CompendiumTypeToType(compType: CompendiumType){
    switch(compType){
        case "ACTIONS":
            return ({} as CompendiumAction)
        case "BASECLASSES":
            return ({} as CompendiumBaseClass)
        case "COMBATGEAR": 
            return ({} as CompendiumCombatGear)
        case "EXCURSIONEQUIPMENT":
            return ({} as CompendiumExcursionEquipment)
        case "TAGS":
            return ({} as CompendiumTag)
        case "SUBCLASSES":
            return ({} as CompendiumSubclass)
        case "ABILITIES":
            return ({} as CompendiumAbility)
    }

}