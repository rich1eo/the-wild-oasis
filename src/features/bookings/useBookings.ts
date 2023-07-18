import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { IFilterBookings, ISortBookings } from '../../types/types';
import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
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

  // 4. Query
  const {
    data: bookingsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // 5. Pre-fetching
  const pageCount = Math.ceil((bookingsData?.count as number) / PAGE_SIZE);
  if (page < pageCount) {
    void queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    void queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookingsData, error, isLoading };
}
