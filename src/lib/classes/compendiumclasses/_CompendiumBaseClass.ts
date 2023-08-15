import type CompendiumObject from "./_CompendiumObject"

export default interface CompendiumBaseClass extends CompendiumObject{
    description: string,
    stats: {
        stamina: number,
        meleeprof: number,
        rangedprof: number,
        magicprof: number,
        dodge: number,
        resilience: number,
        magicdef: number
    }
}