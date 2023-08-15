import { CompendiumStore, type CompendiumObject }from "./_CompendiumStore"

export interface CompendiumBaseClass extends CompendiumObject{
    description: string,
    stats: {
        stamina: number,
        meleeprof: number,
        rangedprof: number,
        magicprof: number,
        dodge: number,
        resilience: number,
        magicdef: number
    }
}

export class CompendiumBaseClassStore extends CompendiumStore{
    constructor(items: CompendiumBaseClass[]) {
        super(items)
    }
    getItem(itemID: string): CompendiumBaseClass | undefined {
        return super.getItem(itemID) as CompendiumBaseClass | undefined
    }
}
