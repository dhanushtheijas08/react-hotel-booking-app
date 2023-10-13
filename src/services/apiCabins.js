import supabase, { supabaseUrl } from "./supabase";

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
  const imageName = `${Math.random() * 10000}-${cabinData.image.name}`.replace(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  const { _, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(error);
    throw new Error("Cabin image could not be stored");
  }
}
