import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';

import { ICabin, IDefaultCabinValues, INewCabin } from '../../types/types';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 1.2rem;
`;

interface FormValues {
  name: string;
  maxCapacity: string;
  regularPrice: string;
  discount: string;
  description: string;
  image: FileList | string;
}

const defaultCabinToEdit: IDefaultCabinValues = {
  name: undefined,
  description: undefined,
  discount: undefined,
  image: undefined,
  maxCapacity: undefined,
  regularPrice: undefined,
};

const initialCabinToEdit: ICabin = {
  name: null,
  description: null,
  discount: null,
  image: null,
  maxCapacity: null,
  regularPrice: null,
};

interface CreateCabinFormProps {
  cabinToEdit?: ICabin;
  onCloseModal?(): void;
}

function CreateCabinForm({
  cabinToEdit = initialCabinToEdit,
  onCloseModal,
}: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: isEditSession
      ? {
          name: editValues.name ? editValues.name : '',
          description: editValues.description ? editValues.description : '',
          discount: editValues.discount ? String(editValues.discount) : '',
          image: editValues.image ? editValues.image : '',
          maxCapacity: editValues.maxCapacity
            ? String(editValues.maxCapacity)
            : '',
          regularPrice: editValues.regularPrice
            ? String(editValues.regularPrice)
            : '',
        }
      : defaultCabinToEdit,
  });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isInWork = isEditing || isCreating;

  function onSubmit(data: FormValues) {
    const newCabin: INewCabin = {
      name: data.name,
      description: data.description,
      discount: +data.discount,
      image: typeof data.image === 'string' ? data.image : data.image[0],
      maxCapacity: +data.maxCapacity,
      regularPrice: +data.regularPrice,
    };

    if (isEditSession && editId) {
      editCabin(
        { newCabinData: newCabin, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(newCabin, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <Form // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
          disabled={isInWork}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
          disabled={isInWork}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 50,
              message: 'Price should be at least 50',
            },
          })}
          disabled={isInWork}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              +value <= +getValues().regularPrice ||
              'Discount should be less then regular price',
          })}
          disabled={isInWork}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
          disabled={isInWork}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
          disabled={isInWork}
        />
      </FormRow>

      <FormFooter>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isInWork}>
          {isEditSession ? 'Edit' : 'Create new'} cabin
        </Button>
      </FormFooter>
    </Form>
  );
}

export default CreateCabinForm;
