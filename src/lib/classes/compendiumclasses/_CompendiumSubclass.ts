import type CompendiumObject from "./_CompendiumObject"

export default interface CompendiumSubclass extends CompendiumObject {
    flavour: string,
    description: string,
    baseclass: string,
    abilities: [
        {
            level: number,
            id: string,
            name: string
        }
    ]

}