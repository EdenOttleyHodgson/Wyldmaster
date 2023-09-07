import type { CompendiumObject,  Source } from "./_CompendiumStore";
import type { Compendium } from "$lib/compendium/compendiumloader";
import type { CompendiumType } from "../CompendiumType";
export interface CompendiumAction extends CompendiumObject {
    flavour: string,
    effect: string,
    apcost: number | "X",
    tags: ActiveTag[];
    source: Source
}

export interface ActiveTag {
    id: string,
    value: number | undefined
}
