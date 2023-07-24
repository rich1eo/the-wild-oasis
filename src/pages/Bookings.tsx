import { useEffect } from 'react';

import Row from '../ui/Row';
import Heading from '../ui/Heading';

import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

function Bookings() {
  useEffect(() => {
    document.title = `Bookings | ${document.title}`;

    return () => {
      document.title = 'The Wild Oasis';
    };
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
