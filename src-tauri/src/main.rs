// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::{ser::SerializeStruct, Deserialize};
use serde_json::{self, Value, json};
use std::fmt::Display;
use std::fs::{self, File};
use std::io::ErrorKind;

use tauri::api::path;
use tauri::{PathResolver, Config};


#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error),
}
impl serde::Serialize for Error{
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  } 

}


#[derive(Debug)]
#[derive(Copy, Deserialize)]
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

#[derive(Debug)]
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
  (CompendiumType::Actions, "actions.json"), 
  (CompendiumType::BaseClasses, "baseclasses.json"),
  (CompendiumType::Subclasses, "subclasses.json"),
  (CompendiumType::Abilities, "abilities.json"),
  (CompendiumType::CombatGear, "combatgear.json"),
  (CompendiumType::ExcursionEquipment, "excursionequipment.json"),
  (CompendiumType::Tags, "tags.json")
  ];

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![load_compendium_data, load_all_characters, save_character])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn load_compendium_data(app_handle: tauri::AppHandle) -> Result<Vec<CompendiumData>, Error>{
  let mut compendium_data:Vec<CompendiumData> = Vec::new(); 
  let data_dir = get_data_dir(app_handle).unwrap();
  let compendium_directory = format!("{}/{}",data_dir, "compendiumdata");
  let entries = {
  
    let entries = fs::read_dir(&compendium_directory);
    match entries {
        Ok(e) => e,
        Err(e) => {
          match e.kind() {
            std::io::ErrorKind::NotFound => {
              fs::create_dir(&compendium_directory)?;
              fs::read_dir(&compendium_directory)?
            }
            _ => panic!("{}", e)
          }
        }
    }
  };
  dbg!(entries);
  for file in FILENAMES {
    let(compendium_type, filename) = file;
    let filename = format!("{}/{}", compendium_directory, filename);
    let data = {
      let contents = fs::read_to_string(&filename);
      match contents {
        Ok(e) => json!(e),
        Err(e) => {
          match e.kind() {
            std::io::ErrorKind::NotFound => {
              File::create(&filename)?;
              json!(fs::read_to_string(&filename)?)
            }
            _ => panic!("{}", e)
          }
        }    
      }
    };
    let compendium_type = *compendium_type;
    compendium_data.push(CompendiumData {compendium_type, data})
    
  }
  Ok(compendium_data)
}

/**
#[derive(Deserialize, Debug)]
struct CharacterData{
  id: String,
  name: String,
  level: usize,
  player_name: String,
  appearance: String,
  notes: String,
  background: String,
  classes: (String, usize, bool),
  inventory: Vec<(String, CompendiumType)>

}
*/
#[tauri::command]
fn load_all_characters(app_handle: tauri::AppHandle) -> Result<Vec<Value>, Error>{
    let data_dir = get_data_dir(app_handle).unwrap_or("".to_owned());
    let directory = format!("{}/{}", data_dir, "characters");
    let entries = {
      let entries = fs::read_dir(&directory);
      match entries {
        Ok(e) => e,
        Err(e) => {
          match e.kind() {
            std::io::ErrorKind::NotFound => {
              fs::create_dir(&directory)?;
              fs::read_dir(&directory)?
            }
            _ => panic!("{}", e)
          }
        }
      }
    
    };
    let file_names:Vec<String> = entries.filter_map(|entry|{
      let path = entry.ok()?.path();
      if path.is_file(){
        path.file_name()?.to_str().map(|s| s.to_owned())
      } else {
        None
      }

    }).collect();
    dbg!(&file_names);
    let mut characters: Vec<Value> = Vec::new();
    println!("test!");
    for file in file_names {
      println!("{}",&file);
      let fname = format!("{}/{}", &directory, file);
      characters.push(json!(fs::read_to_string(fname)?));
    }
    Ok(characters)

}



#[tauri::command]
fn save_character(character_info: Value, id: &str, app_handle: tauri::AppHandle) -> Result<(), Error> {
    let data_dir = get_data_dir(app_handle).unwrap();
    let character_as_string = serde_json::to_string_pretty(&character_info).unwrap();
    let filename = format!("{}/{}/{}.json", data_dir, "characters", id);
    fs::write(filename, character_as_string)?;
    Ok(()) 
}

fn get_data_dir(app_handle: tauri::AppHandle) -> Option<String>{

    let data_buf = app_handle.path_resolver().app_local_data_dir().unwrap_or("".into());
    return Some(data_buf.as_os_str().to_str()?.to_owned())
} 