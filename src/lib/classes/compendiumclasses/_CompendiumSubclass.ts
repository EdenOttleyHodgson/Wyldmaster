import { CompendiumStore, type CompendiumObject } from "./_CompendiumStore"

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
    ]

}

export class CompendiumSubclassStore extends CompendiumStore {
    constructor(items: CompendiumSubclass[]) {
        super(items)
    }
    getItem(itemID: string): CompendiumSubclass | undefined {
        return super.getItem(itemID) as CompendiumSubclass | undefined
    }
}