import type { CompendiumObject,  Source } from "./_CompendiumStore";
import type { Compendium } from "$lib/compendium/compendiumloader";
import type { CompendiumType } from "../utilityTypes";
export interface CompendiumAction extends CompendiumObject {
    flavour: string,
    effect: string,
    apcost: number,
    tags: string[];
    source: Source
}
