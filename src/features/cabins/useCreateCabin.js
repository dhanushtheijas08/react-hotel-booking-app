import { useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabinRow, isLoading: isCreating } = useMutation({
    mutationKey: ["cabin"],
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Successfully cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createCabinRow, isCreating };
}
