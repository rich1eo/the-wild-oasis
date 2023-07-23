import styled from 'styled-components';

import Stats from './Stats';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';

import { IBookingDashboard } from '../../types/types';
import { useCabins } from '../cabins/useCabins';
import { useRecentStays } from './useRecentStays';
import { useRecentBookings } from './useRecentBookings';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading: bookingsIsLoading, bookings } = useRecentBookings();
  const { isLoading: staysIsLoading, confirmStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (bookingsIsLoading || staysIsLoading || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings as IBookingDashboard[]}
        numDays={numDays}
        confirmedStays={confirmStays as IBookingDashboard[]}
        cabinCount={cabins!.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmStays as IBookingDashboard[]} />
      <SalesChart
        bookings={bookings as IBookingDashboard[]}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}
