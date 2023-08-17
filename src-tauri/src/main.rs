// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::ser::SerializeStruct;
use serde_json::{self, Value, json};
use std::fs;



#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error)

}
impl serde::Serialize for Error{
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  } 

}

#[derive(Copy)]
enum CompendiumType{
  Actions,
  BaseClasses,
  CombatGear,
  ExcursionEquipment,
  Tags,
  Subclasses,
  Abilities
}

impl Clone for CompendiumType{
 fn clone(&self) -> Self {
     match &self {
        CompendiumType::Actions => Self::Actions,
        CompendiumType::BaseClasses => Self::BaseClasses,
        CompendiumType::CombatGear => Self::CombatGear,
        CompendiumType::ExcursionEquipment => Self::ExcursionEquipment,
        CompendiumType::Tags => Self::Tags,
        CompendiumType::Subclasses => Self::Subclasses,
        CompendiumType::Abilities=> Self::Abilities
     }
 } 

}
impl serde::Serialize for CompendiumType{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer {
          match *self {
            CompendiumType::Actions => serializer.serialize_unit_variant("CompendiumType", 0, "ACTIONS"),
            CompendiumType::BaseClasses => serializer.serialize_unit_variant("CompendiumType", 1, "BASECLASSES"),
            CompendiumType::CombatGear => serializer.serialize_unit_variant("CompendiumType", 2, "COMBATGEAR"),
            CompendiumType::ExcursionEquipment => serializer.serialize_unit_variant("CompendiumType", 3, "EXCURSIONEQUIPMENT"),
            CompendiumType::Tags => serializer.serialize_unit_variant("CompendiumType", 4, "TAGS"),
            CompendiumType::Subclasses => serializer.serialize_unit_variant("CompendiumType", 5, "SUBCLASSES"),
            CompendiumType::Abilities => serializer.serialize_unit_variant("CompendiumType", 6, "ABILITIES"),
        }
    }
}
struct CompendiumData {
  compendium_type: CompendiumType,
  data: Value

}
impl serde::Serialize for CompendiumData{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer
    {
      let mut state = serializer.serialize_struct("CompendiumData", 2)?;
      state.serialize_field("compendium_type", &self.compendium_type)?;
      state.serialize_field("data", &self.data)?;
      state.end()
    }
}


const FILENAMES: &'static [(CompendiumType, &'static str)] = &[
  (CompendiumType::Actions, "D:/UserArea/Programming/svelte/wyldmaster/compendiumdata/actions.json"), 
  (CompendiumType::BaseClasses, "D:/UserArea/Programming/svelte/wyldmaster/compendiumdata/baseclasses.json"),
  (CompendiumType::Subclasses, "D:/UserArea/Programming/svelte/wyldmaster/compendiumdata/subclasses.json"),
  (CompendiumType::Abilities, "D:/UserArea/Programming/svelte/wyldmaster/compendiumdata/abilities.json"),
  (CompendiumType::CombatGear, "D:/UserArea/Programming/svelte/wyldmaster/compendiumdata/combatgear.json"),
  (CompendiumType::ExcursionEquipment, "D:/UserArea/Programming/svelte/wyldmaster/compendiumdata/excursionequipment.json"),
  (CompendiumType::Tags, "D:/UserArea/Programming/svelte/wyldmaster/compendiumdata/tags.json")
  ];

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![load_compendium_data])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn load_compendium_data() -> Result<Vec<CompendiumData>, crate::Error>{
  let mut compendium_data:Vec<CompendiumData> = Vec::new(); 
  for file in FILENAMES {
    let(compendium_type, filename) = file;
    let data = json!(fs::read_to_string(*filename)?);
    let compendium_type = *compendium_type;
    compendium_data.push(CompendiumData {compendium_type, data})

  }
  Ok(compendium_data)
}