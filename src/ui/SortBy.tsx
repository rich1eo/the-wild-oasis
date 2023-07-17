import { ChangeEvent } from 'react';
import { IOption } from '../types/types';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

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
      options={options}
      type="white"
      value={searchParams.get('sortBy') || ''}
      onChange={handleChange}
    />
  );
}
