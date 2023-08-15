import type CompendiumObject from "./_CompendiumStore";

export default interface CompendiumTag extends CompendiumObject {
    description: string,
    value: boolean;

}