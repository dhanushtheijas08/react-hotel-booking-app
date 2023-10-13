import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "./FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: cabinEditId, ...cabinVal } = cabinToEdit;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabinEditId ? cabinVal : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["cabin"],
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Successfully cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onFormSubmit = function (data) {
    const newData = { ...data, image: data.image[0] };
    mutate(newData);
  };
  const onFormError = function (err) {
    // console.log(err);
  };
  return (
    <Form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: {
              value: true,
              message: "Max Capacity is required",
            },
            min: {
              value: 3,
              message: "Max Capacity must greater than 2",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: {
              value: true,
              message: "Regular Price is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: {
              value: true,
              message: "Discount is required",
            },
            validate: (val) => {
              return (
                parseInt(val) <= parseInt(getValues().regularPrice) ||
                "Discount price must less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          disabled={isLoading}
          id="image"
          accept="image/*"
          {...register("image", {
            required: {
              value: cabinEditId ? false : true,
              message: "Image is required",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {cabinEditId ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
