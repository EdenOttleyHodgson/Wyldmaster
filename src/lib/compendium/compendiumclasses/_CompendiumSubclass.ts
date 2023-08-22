import type { CompendiumObject } from "./_CompendiumStore"

export interface CompendiumSubclass extends CompendiumObject {
    flavour: string,
    description: string,
    baseclass: string,
    abilities: [
        {
            level: number,
            id: string,
            name: string
        }
    ],
    featureTable: [] | null

}
