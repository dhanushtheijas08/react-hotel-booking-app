import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .upsert([{ id: 1, ...newSetting }], {
      onConflict: ["id"],
    });

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
