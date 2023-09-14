use serde::{ser::SerializeStruct, Deserialize};
use serde_json::Value;
struct Compendium {}

#[derive(Debug, Copy, Deserialize)]
pub enum CompendiumType {
    Actions,
    BaseClasses,
    CombatGear,
    ExcursionEquipment,
    Tags,
    Subclasses,
    Abilities,
}

impl Clone for CompendiumType {
    fn clone(&self) -> Self {
        match &self {
            CompendiumType::Actions => Self::Actions,
            CompendiumType::BaseClasses => Self::BaseClasses,
            CompendiumType::CombatGear => Self::CombatGear,
            CompendiumType::ExcursionEquipment => Self::ExcursionEquipment,
            CompendiumType::Tags => Self::Tags,
            CompendiumType::Subclasses => Self::Subclasses,
            CompendiumType::Abilities => Self::Abilities,
        }
    }
}
impl serde::Serialize for CompendiumType {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match *self {
            CompendiumType::Actions => {
                serializer.serialize_unit_variant("CompendiumType", 0, "ACTIONS")
            }
            CompendiumType::BaseClasses => {
                serializer.serialize_unit_variant("CompendiumType", 1, "BASECLASSES")
            }
            CompendiumType::CombatGear => {
                serializer.serialize_unit_variant("CompendiumType", 2, "COMBATGEAR")
            }
            CompendiumType::ExcursionEquipment => {
                serializer.serialize_unit_variant("CompendiumType", 3, "EXCURSIONEQUIPMENT")
            }
            CompendiumType::Tags => serializer.serialize_unit_variant("CompendiumType", 4, "TAGS"),
            CompendiumType::Subclasses => {
                serializer.serialize_unit_variant("CompendiumType", 5, "SUBCLASSES")
            }
            CompendiumType::Abilities => {
                serializer.serialize_unit_variant("CompendiumType", 6, "ABILITIES")
            }
        }
    }
}

#[derive(Debug)]
pub struct CompendiumData {
    compendium_type: CompendiumType,
    data: Value,
}
impl serde::Serialize for CompendiumData {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("CompendiumData", 2)?;
        state.serialize_field("compendium_type", &self.compendium_type)?;
        state.serialize_field("data", &self.data)?;
        state.end()
    }
}
