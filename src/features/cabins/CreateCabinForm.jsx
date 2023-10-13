import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "./FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
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
    mutate(data);
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

      <FormRow
        disabled={isLoading}
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
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

      <FormRow
        disabled={isLoading}
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
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

      <FormRow
        disabled={isLoading}
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
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
                val <= getValues().regularPrice ||
                "Discount price must less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        disabled={isLoading}
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow
        disabled={isLoading}
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
