import type CompendiumObject from "./_CompendiumObject"

export default interface CompendiumExcursionEquipment extends CompendiumObject{
    weight: number,
    actions: string[]
    source: string
}