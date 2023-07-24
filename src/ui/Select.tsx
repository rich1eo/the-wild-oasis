import styled from 'styled-components';
import { ChangeEvent } from 'react';

import { IOption } from '../types/types';

const StyledSelect = styled.select<{ $type: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${props =>
      props.$type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  type: string;
  value: string;
  options: IOption[];
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
}

export default function Select({
  type,
  value,
  options,
  onChange: handleChange,
}: SelectProps) {
  return (
    <StyledSelect value={value} $type={type} onChange={handleChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
