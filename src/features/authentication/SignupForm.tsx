import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

// Email regex: /\S+@\S+\.\S+/

type Inputs = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignupForm() {
  const { register, getValues, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Full name"
        error={errors.fullName?.message}
        htmlFor="fullName"
      >
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label="Email address"
        error={errors.email?.message}
        htmlFor="email"
      >
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provida a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
        htmlFor="password"
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors.passwordConfirm?.message}
        htmlFor="passwordConfirm"
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: value =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
