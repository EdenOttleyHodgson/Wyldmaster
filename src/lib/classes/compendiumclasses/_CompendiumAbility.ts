import type CompendiumObject from "./_CompendiumStore";

export default class CompendiumAbility extends CompendiumObject{
    effect: string,
    actions: string[],
    source: string
}