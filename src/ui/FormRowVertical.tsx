import { ReactElement } from 'react';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowVerticalProps {
  label?: string;
  error?: string;
  children: ReactElement;
  htmlFor?: string;
}

function FormRowVertical({
  label,
  error,
  children,
  ...props
}: FormRowVerticalProps) {
  return (
    <StyledFormRow>
      {label && <Label {...props}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
