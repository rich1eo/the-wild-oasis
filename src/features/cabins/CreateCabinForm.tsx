import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { INewCabin } from '../../types/types';
import { createCabin } from '../../services/apiCabins';

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
  image: FileList;
}

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
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

  function onSubmit(data: FormValues) {
    const newCabin: INewCabin = {
      name: data.name,
      description: data.description,
      discount: +data.discount,
      image: data.image[0],
      maxCapacity: +data.maxCapacity,
      regularPrice: +data.regularPrice,
    };
    mutate(newCabin);
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'This field is required',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormFooter>
        <Button variation="secondary" type="reset">
          Clear
        </Button>
        <Button disabled={isCreating}>Create cabin</Button>
      </FormFooter>
    </Form>
  );
}

export default CreateCabinForm;
