import { styled } from 'styled-components';

const Input = styled.input`
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  &:disabled {
    background-color: var(--color-grey-200);
  }
`;

export default Input;
