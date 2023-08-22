import type { CompendiumObject } from "./_CompendiumStore";

export interface CompendiumTag extends CompendiumObject {
    description: string,
    value: boolean;
}
