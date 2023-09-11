<script lang="ts">
    import { onMount } from "svelte";
    import type { Character } from "../classes/CharacterClass";
    import { getCompendium, type Compendium, itemIdArrToItemString } from "$lib/compendium/compendiumloader";
    import { isWeapon, type CompendiumCombatGear, isArmour, type armourStats } from "$lib/compendium/compendiumclasses/_CompendiumCombatGear";
    import { stringify } from "uuid";

    export let data
    let character = data.character as Character
    let compendium: Compendium

    interface PrintableWeapon {
        name: string,
        damage: string,
        range: string,
        apcost: string,
        weight: string,
        tags: string
    }

    interface PrintableArmour {
        name: string,
        weight: string,
        resilience: string,
        dodge: string,
        staminaReduction: string
        tags: string
    }


    interface PrintableInventoryItem {
        name: string,
        effect: string,
        load: string
    }

    interface PrintableAction {
        name: string,
        apcost: string,
        effect: string
    }

    async function loadWeaponArr() {
        if(!compendium) {
            compendium = await getCompendium()
        }
        let weaponArr: PrintableWeapon[] = []
        character.staticInfo.inventory
            .filter((x) => x.compType === "COMBATGEAR")
            .map((x) => compendium.combatGearStore.getItem(x.id))
            .forEach((item) => {
                console.log(item)
                if (item) {
                    if (isWeapon(item.stats)) {
                        let printableItem: PrintableWeapon = {
                            name: item.name,
                            damage: item.stats.damage.toString(),
                            range: item.stats.range,
                            apcost: item.stats.apcost.toString(),
                            weight: item.stats.weight.toString(),
                            tags: itemIdArrToItemString(item.tags, "TAGS")
                        }
                        weaponArr.push(printableItem)
                    }
                   
                }
        })
        for (let idx = weaponArr.length ; idx < 8; idx++) {
            weaponArr.push({
                name: "&nbsp",
                damage: " ",
                range: " ",
                apcost: " ",
                weight: " ",
                tags: ""
            })
            
        }
        console.log(weaponArr)
        return weaponArr

    }

    async function loadArmourArr() {
        if(!compendium) {
            compendium = await getCompendium()
        }
        let armourArr: PrintableArmour[]= []
        character.staticInfo.inventory
            .filter((x) => x.compType === "COMBATGEAR")
            .map((x) => compendium.combatGearStore.getItem(x.id))
            .forEach((item) => {
                console.log(item)
                if (item) {
                    if(isArmour(item.stats)) {
                        let printableItem: PrintableArmour = {
                            name: item.name,
                            resilience: item.stats.resilience.toString(),
                            dodge: item.stats.dodge.toString(),
                            staminaReduction: item.stats.staminareduction.toString(),
                            weight: item.stats.weight.toString(),
                            tags: itemIdArrToItemString(item.tags, "TAGS")
                        }
                        armourArr.push(printableItem)
                    }
                }
        })
        for (let idx = armourArr.length ; idx < 8; idx++) {
            armourArr.push({
                name: "&nbsp",
                resilience: " ",
                dodge: " ",
                staminaReduction: " ",
                weight: " ",
                tags: ""
            })
            
        }
        return armourArr
    }

    async function loadAbilityArr() {
        if(!compendium) {
            compendium = await getCompendium()
        }
        let abilityArr = character.derivedInfo.abilities.map((ability) => compendium.abilityStore.getItem(ability))
        for (let idx = abilityArr.length; idx < 12; idx++) {
            abilityArr.push({
                id: "",
                name: "",
                effect: "",
                actions: [],
                source: {id: "", sourceType: "ABILITIES"},
                level: 0
            })
        }
        return abilityArr
    }
    async function loadInventory() {
        if(!compendium) {
            compendium = await getCompendium()
        }
        let printableInventory: {items: PrintableInventoryItem[], load: number} = {items: [], load: 0}
        character.staticInfo.inventory.forEach((itemRef) => {
            if(itemRef.compType === "COMBATGEAR") {
                let item = compendium.combatGearStore.getItem(itemRef.id)
                if(item) {
                    printableInventory.items.push({name: item.name, effect:"Weapon/Armour", load: item.stats.weight.toString()})
                    printableInventory.load += item.stats.weight
                }
            } else if(itemRef.compType ==="EXCURSIONEQUIPMENT") {
                let item = compendium.excursionEquipmentStore.getItem(itemRef.id) 
                if (item){
                    printableInventory.items.push({name: item.name, effect: item.effect, load: item.weight.toString()})
                    printableInventory.load += item.weight
                }
            }
        })
        for (let idx = printableInventory.items.length; idx < 10; idx ++) {
            printableInventory.items.push({
                name: "&nbsp",
                effect : "",
                load: ""
            })
        }
        return printableInventory
    }
    async function loadActionArr(){
        if(!compendium) {
            compendium = await getCompendium()
        }
        let actionArr: PrintableAction[] = []
        character.derivedInfo.actions.forEach((actionId) =>{
            if (actionArr.length < 27) {
                let action = compendium.actionStore.getItem(actionId)
                if(action && action.source.id != "universal") {
                    actionArr.push({
                        name: action.name,
                        effect: action.effect,
                        apcost: action.apcost.toString()
                    })
                }
            }
        })
        for (let idx = actionArr.length; idx < 27; idx++){
            actionArr.push({
                name: "",
                effect: "",
                apcost: "",
            })
        }
        return actionArr
    }
</script>
<div class="page-box">
    <div class="printable">
        <div class="bottom-border" style="height: 10%; display:flex; align-items:center">
            <div class="section">
                <div class = info-div style="width: 40%; height: 40%">
                    <div class ="write-in" style="width: 95%; min-height: 50%">
                        {character.staticInfo.name}
                    </div>
                    Name
                </div>
                <div style="width: 100%; height:80%; display: flex; flex-direction: column; margin-top: -5mm">
                    <div style="display: flex; justify-content:center; height: 45%; align-items:center">
                        <div class="info-div" style="width: 50%; height:40%; margin-left: -3mm !important">
                            <div class="write-in">{character.staticInfo.player_name}</div>
                            Player Name
                        </div>
                        <div class="info-div" style="width: 50%; height:40%">
                            <div class="write-in">
                                {character.staticInfo.background}
                            </div>
                            Background
                        </div>
                    </div>
                    <div style="display: flex; height: 45%; align-items: center;">
                        <div class="info-div" style="width: 10%; height: 40%">
                            <div class="write-in">
                                {character.staticInfo.level}
                            </div>
                            Level
                        </div>
                        <div class="info-div" style="width: 90%; height: 40%">
                            <div class="write-in">
                                {character.derivedInfo.className}
                            </div>
                            Classes
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="height: 5%; display: flex; align-items: center; justify-content: space-between; padding-bottom: 2mm" class="bottom-border">
            <div style="border: 1px solid black; min-width: 15%; height: 95%; text-align: center">
                Stamina
                <div>
                    &nbsp;&nbsp;/{character.derivedInfo.combatStats.stamina}
                </div>
            </div>
                
            <div style="border: 1px solid black; min-width: 15%; height: 95%; display: flex; align-items: center; justify-content: center; flex-direction: column">
                AP
                <div class="ap-div">
                    <div id="circle"></div>
                    <div id="circle"></div>
                    <div id="circle"></div>
                    <div id="circle"></div>
                </div>
            </div>

                <div class="stats-box">
                    Melee Prof.
                    
                    <div class="stats-text">
                        {character.derivedInfo.combatStats.meleeprof}
                    </div>
                </div>
                <div class="stats-box">
                    Ranged Prof.
                    <div class="stats-text">
                        {character.derivedInfo.combatStats.rangedprof}
                    </div>
                </div>
                <div class="stats-box">
                    Magic Prof.
                    <div class="stats-text">
                        {character.derivedInfo.combatStats.magicprof}
                    </div>
                </div>
                <div class="stats-box"> 
                    Dodge
                    <div class="stats-text">
                        {character.derivedInfo.combatStats.dodge}
                    </div>
                </div>
                <div class="stats-box"> 
                    Resilience
                    <div class="stats-text">
                        {character.derivedInfo.combatStats.resilience}
                    </div>
                </div>
                <div class="stats-box">
                    Magical Defence
                    <div class="stats-text">
                        {character.derivedInfo.combatStats.magicdef}
                    </div>
                </div>
            </div>
        
        <div style="height: 90%; display: flex; flex-direction: column; margin-left:2px;">
            <div style="width: 99%; height: 30%; margin-top: -2mm; padding-bottom: 2mm" class="bottom-border">
                <h3 style="text-align: center">Wounds</h3>
                <table class="wounds-table" style="width: 100.2%; height:78%">
                    <tr>
                        <th style="width: 20%;">Severity</th>
                        <th style="width: 22.5%;">Name</th>
                        <th>Effect</th>
                    </tr>
                    <tr>
                        <td>1: Minor</td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>2: Moderate</td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                    <tr>
                        <td>3: Major</td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                    <tr>
                        <td>4: Lethal</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="combat-gear-div">
                <div style="width: 100%;">
                    <h3 style="text-align: center;">Weapons</h3>
                    <table style="height: 40%;">
                        <tr>
                            <th class="fourtypercentwidth">Name</th>
                            <th>Damage</th>
                            <th>Range</th>
                            <th>Weight</th>
                            <th class="eightpercentwidth">AP Cost</th>
                            <th class="fourtypercentwidth">Tags</th>
                        </tr>
                        {#await loadWeaponArr() then weaponArr}
                            {#each weaponArr as weapon}
                                <tr>
                                    <td>{@html weapon.name}</td>
                                    <td>{weapon.damage}</td>
                                    <td>{weapon.range}</td>
                                    <td>{weapon.weight}</td>
                                    <td>{weapon.apcost}</td>
                                    <td>{weapon.tags}</td>
                                </tr>
                            {/each}
                        {/await}
                    </table>
                    <h3 style="text-align: center;">Armour</h3>
                    <table style="height: 40%;">
                        <tr>
                            <th class="fourtypercentwidth">Name</th>
                            <th>Weight</th>
                            <th>Resilience</th>
                            <th>Dodge</th>
                            <th>Stamina Reduction</th>
                            <th class="fourtypercentwidth">Tags</th>
                        </tr>
                        
                        {#await loadArmourArr() then armourArr}
                            {#each armourArr as armour}
                                <tr>
                                    <td>{@html armour.name}</td>
                                    <td>{armour.weight}</td>
                                    <td>{armour.resilience}</td>
                                    <td>{armour.dodge}</td>
                                    <td>{armour.staminaReduction}</td>
                                    <td>{armour.tags}</td>
                                </tr>
                            {/each}
                        {/await}

                    </table>
                </div>
            </div>
        </div>
        
    </div>
    <div class="printable">
        <h3 style="text-align: center;">Abilities</h3>
        <div style="height: 50%; display:flex; flex-flow: row wrap; justify-content: center; align-items: center" class="bottom-border">
            {#await loadAbilityArr() then abilityArr }
                {#each abilityArr as ability}                
                    <div class="abilitydiv">
                        <div class="bottom-border" style="height: 20%;">Name: {ability?.name}</div>
                        <div>Effect: {ability?.effect}</div>
                    </div>
                {/each}
            {/await}
        </div>
        <div style="height: 50%; display:flex; align-items:center; flex-direction: column">
            <h3>Inventory</h3>
            <div style="width: 100%; height: 100%; display: flex">
                <div style="width: 100%; margin: -0.5mm; align-items: center">
                    {#await loadInventory() then inventory }
                    <div style="text-align: center;">
                        Load:
                    </div>
                    <div style="display: flex; flex-flow: row wrap; align-items: center; justify-content: center">
                        
                        {#each Array.from(Array(inventory.load).keys()) as _, idx}                
                            <div class="loadbox filled">
                            </div>
                            {#if idx === 10}
                                <div style="border-right: 1px solid black; height: 12px"></div>
                            {/if}
                        {/each}
                        {#each Array.from(Array(20 - inventory.load).keys()) as _, idx}                
                            <div class="loadbox">
                            </div>
                            {#if idx === 9 - inventory.load}
                                <div style="border-right: 1px solid black; height: 12px"></div>
                            {/if}
                        {/each}
                    </div>
                    <div style="height: 88%; display: flex; justify-content:center;">
                        <table style="width: 95%;">
                            <tr>
                                <th style="width: 25%;">Name</th>
                                <th style="width: 80%;">Effect</th>
                                <th>Load</th>
                            </tr>
                            {#each inventory.items as item}
                                <tr>
                                    <td>{@html item.name}</td>
                                    <td>{item.effect}</td>
                                    <td>{item.load}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                    {/await}
                </div>

            </div>
        </div>
    </div>
    <div class="printable">
        <h3 style="text-align: center">Actions</h3>
        <div style="display: flex; flex-flow: row wrap; height: 100%; justify-content: center">
            {#await loadActionArr() then actionArr}
                {#each actionArr as action}
                    <div class="action-box">
                        <div style="display: flex; height: 20%;" class="bottom-border">
                            <div style="border-right: 1px solid black; width: 80%">Name: {action.name}</div>
                            <div>AP: {action.apcost}</div>
                        </div>
                        <div>Effect: {action.effect}</div>
                    </div>
                {/each}
            {/await}
        </div>
    </div>
    <div class="printable">
        glaggle
    </div>
</div>


<style>
@media print {
    body{
        margin:0;
        padding:0;   
    }

    @page {
        height: 300mm;
        width: 210mm;
        margin: 0 !important;
        padding: 0 !important;
        color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        background-color: white;
    }

    .printable {
        /* zoom: 75%; */
        width: 100% !important;
        height: 300mm !important;
        border: 0mm solid black !important;
        box-sizing:content-box !important;
        page-break-after: page !important;
    }
    .page-box{
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0 !important;
        left: 0 !important;
        width: 210mm !important;
        height: 1188mm !important;
    }

}


    .printable {
        display: flex;
        flex-direction: column;
        /* zoom: 75%; */
        width: 100% !important;
        height: 300mm !important;
        border: 1mm solid black;
        box-sizing:content-box !important;
        page-break-after: page !important;
    }

    .printable div{
        margin: 1mm;

    }
    .page-box{
        display: flex;
        flex-direction: column;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 20px;
        left: 25%;
        width: 210mm;
        height: 1188mm;
    }

    .info-div{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0mm !important;
        font-size: small;
    }
    .write-in{
        border: 1mm solid black;
        width: 95%;
        min-height: 100%;
    }
    .section{
       display: flex;
       align-items: center;
       
       width: 100%;
       height: 100%;
       margin: -1mm;
    } 
    #circle {
      width: 10px;
      height: 10px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 25px;
      border: 1px solid black
    }
    .stats-box{
        border: 1px solid black;
        width: 100%;
        height: 95%;
        font-size: x-small;
        text-align: center;
        margin: -1mm;
    }
    .bottom-border{
        border-bottom: 2px solid black;
    }
    th, td, table{
        border: 1px solid black;
        border-collapse: collapse
    }
    .abilitydiv{
        border: 1px solid black;
        height: 20%;
        width: 30%;
        font-size: xx-small;
    }
    .loadbox {
        border: 1px solid black;
        width: 10px;
        height: 10px;
    }
    .action-box{
        border: 1px solid black;
        height: 100px;
        width: 250px;
        font-size: xx-small;
    }
    .stats-text{
        font-size: medium;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 55%;
    }
    .filled {
        background-color: black;
    }
    .ap-div{
        display: flex;
        flex-direction: row;
    }
    .wounds-table{
        width: 100.2%; height:78%   
    }

    .combat-gear-div {
        width: 100.2%;
        height: 70%;
        display: flex;
        margin: 0 !important;
        justify-content: space-between
    }

    .fourtypercentwidth {
        width: 40%;
    }
    .eightpercentwidth {
        width: 8%;
    }
</style>