import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinRow, isLoading: isDeleting } = useMutation({
    mutationKey: ["cabin"],
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Successfully cabin deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteCabinRow, isDeleting };
}
