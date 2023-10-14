import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditcabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabinRow, isLoading: isEditing } = useMutation({
    mutationKey: ["cabin"],
    mutationFn: ({ data, id, isOldImage }) => editCabin(data, id, isOldImage),
    onSuccess: () => {
      toast.success("Successfully cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editCabinRow, isEditing };
}
