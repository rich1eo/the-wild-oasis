import { styled } from 'styled-components';
import { ReactElement } from 'react';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    padding-top: 0;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const InputError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowProps {
  label?: string;
  error?: string | undefined;
  children: ReactElement<HTMLInputElement>;
}

export default function FormRow({ children, error, label }: FormRowProps) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <InputError>{error}</InputError>}
    </StyledFormRow>
  );
}
