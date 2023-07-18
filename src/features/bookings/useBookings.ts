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

  // 3. Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: bookingsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { bookingsData, error, isLoading };
}
