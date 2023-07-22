import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import Stats from './Stats';

import { IBookingDashboard } from '../../types/types';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading: bookingsIsLoading, bookings } = useRecentBookings();
  const {
    stays,
    isLoading: staysIsLoading,
    confirmStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (bookingsIsLoading || staysIsLoading || isLoadingCabins)
    return <Spinner />;

  console.log('Bookings', bookings);
  console.log('Stays', stays);
  console.log('Confirmed Stays', confirmStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings as IBookingDashboard[]}
        confirmedStays={confirmStays as IBookingDashboard[]}
        numDays={numDays}
        cabinCount={cabins!.length}
      />
      <div>Today's activity</div>
      <div>Cart Stay Duration</div>
      <div>Cart Sales</div>
    </StyledDashboardLayout>
  );
}
