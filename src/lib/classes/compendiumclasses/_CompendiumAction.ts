import type { CompendiumObject,  Source } from "./_CompendiumStore";
import type { Compendium } from "$lib/compendium/compendiumloader";
import type { CompendiumType } from "../../compendium/CompendiumType";
export interface CompendiumAction extends CompendiumObject {
    flavour: string,
    effect: string,
    apcost: number,
    tags: string[];
    source: Source
}
