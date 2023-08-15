import type CompendiumObject from "./_CompendiumObject";

export default interface CompendiumAbility extends CompendiumObject{
    effect: string,
    actions: string[],
    source: string
}