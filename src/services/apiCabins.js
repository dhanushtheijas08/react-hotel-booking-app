import supabase from "./supabase";

export async function getCabin() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins not found");
  }
  return data;
}
