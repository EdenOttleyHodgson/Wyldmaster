import type { CompendiumObject, Source } from "./_CompendiumStore";

export interface CompendiumAbility extends CompendiumObject{
    effect: string,
    actions: string[],
    source: Source,
    level: number
}

