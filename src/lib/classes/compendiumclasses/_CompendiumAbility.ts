import type { CompendiumObject } from "./_CompendiumStore";

export interface CompendiumAbility extends CompendiumObject{
    effect: string,
    actions: string[],
    source: string
}

