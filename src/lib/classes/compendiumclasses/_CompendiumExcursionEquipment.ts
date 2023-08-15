import type CompendiumObject from "./_CompendiumStore"

export default interface CompendiumExcursionEquipment extends CompendiumObject{
    weight: number,
    actions: string[]
    source: string
}