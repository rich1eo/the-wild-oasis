import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { IFilterBookings, ISortBookings } from '../../types/types';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // 1. Filter
  const filterValue = searchParams.get('status') || 'all';
  const filter: IFilterBookings | null =
    filterValue === 'all'
      ? null
      : {
          value: filterValue,
          field: 'status',
        };

  // 2. Sort
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRow.split('-') as [string, string];
  const sortBy: ISortBookings = { field, direction };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, error, isLoading };
}
