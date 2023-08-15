import { CompendiumStore, type CompendiumObject, type Source } from "./_CompendiumStore";
import type { Compendium } from "$lib/compendium/compendiumloader";
import type { CompendiumType } from "../utilityTypes";
export interface CompendiumAction extends CompendiumObject {
    flavour: string,
    effect: string,
    apcost: number,
    tags: string[];
    source: Source
}

export class CompendiumActionStore extends CompendiumStore {
    constructor(items: CompendiumAction[]) {
        super(items)
    }
    getItem(itemID: string): CompendiumAction | undefined {
        return super.getItem(itemID) as CompendiumAction;
    }
}