import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ICabin, IDefaultCabinValues, INewCabin } from '../../types/types';
import { createEditCabin } from '../../services/apiCabins';

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

interface CreateCabinFormProps {
  cabinToEdit?: ICabin;
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

function CreateCabinForm({
  cabinToEdit = initialCabinToEdit,
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

  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    async onSuccess() {
      toast.success('New cabin successfully created');
      reset();
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: INewCabin;
      id: number;
    }) => createEditCabin(newCabinData, id),
    async onSuccess() {
      toast.success('New cabin successfully edited');
      reset();
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

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
    console.log(newCabin);
    if (isEditSession && editId) {
      editCabin({ newCabinData: newCabin, id: editId });
    } else {
      createCabin(newCabin);
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button variation="secondary" type="reset">
          Clear
        </Button>
        <Button disabled={isInWork}>
          {isEditSession ? 'Edit' : 'Create new'} cabin
        </Button>
      </FormFooter>
    </Form>
  );
}

export default CreateCabinForm;
