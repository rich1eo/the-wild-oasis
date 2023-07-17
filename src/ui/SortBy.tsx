import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IOption } from '../types/types';

import Select from './Select';

interface SortByProps {
  options: IOption[];
}

export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={searchParams.get('sortBy') || ''}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}
