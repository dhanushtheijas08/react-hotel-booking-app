import { useForm } from "react-hook-form";

import { useEditcabin } from "./useEditcabin";
import { useCreateCabin } from "./useCreateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "./FormRow";

function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { id: cabinEditId, ...cabinVal } = cabinToEdit;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabinEditId ? cabinVal : {},
  });
  const { errors } = formState;
  const { createCabinRow: createCabin, isCreating } = useCreateCabin();
  const { editCabinRow: editCabin, isEditing } = useEditcabin();
  let isLoading = isCreating || isEditing;
  const onFormSubmit = function (data) {
    if (!cabinEditId) {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        }
      );
    } else {
      const imageData =
        typeof data.image === "string" ? data.image : data.image[0];

      const newData = { ...data, image: imageData };
      editCabin(
        {
          data: newData,
          id: cabinEditId,
          isOldImage: typeof data.image === "string" ? true : false,
        },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        }
      );
    }
  };
  const onFormError = function (err) {
    // console.log(err);
  };
  return (
    <Form onSubmit={handleSubmit(onFormSubmit, onFormError)} type="modal">
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
        <Button
          variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
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
