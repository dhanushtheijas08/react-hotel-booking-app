import supabase from "./supabase";

export async function getCabin() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins not found");
  }
  return data;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createCabin(cabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinData])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
}
