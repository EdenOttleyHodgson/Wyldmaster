import { CompendiumStore, type CompendiumObject } from "./_CompendiumStore";

export interface CompendiumTag extends CompendiumObject {
    description: string,
    value: boolean;
}

export class CompendiumTagStore extends CompendiumStore{
    constructor(items: CompendiumTag[]) {
        super(items)
    }
    getItem(itemID: string): CompendiumTag | undefined {
        return super.getItem(itemID) as CompendiumTag | undefined
    }
}