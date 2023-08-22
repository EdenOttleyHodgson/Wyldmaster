import type {CombatStats} from "../../charactercreator/Character"
import type { CompendiumObject }from "./_CompendiumStore"

export interface CompendiumBaseClass extends CompendiumObject{
    description: string,
    stats: CombatStats
}
