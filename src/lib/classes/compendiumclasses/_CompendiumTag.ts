import type CompendiumObject from "./_CompendiumObject";

export default interface CompendiumTag extends CompendiumObject {
    description: string,
    value: boolean;

}