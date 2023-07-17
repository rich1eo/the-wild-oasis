import { toast } from 'react-hot-toast';

import { IBooking } from '../../types/types';
import { useBookings } from './useBookings';

import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import BookingRow from './BookingRow';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { bookings, error, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

  if (error && error instanceof Error) {
    toast.error(error.message);
  }

  if (!bookings || !bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={booking => (
            <BookingRow key={booking.id} booking={booking as IBooking} />
          )}
        />
        <Table.Footer>
          <Pagination count={bookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
