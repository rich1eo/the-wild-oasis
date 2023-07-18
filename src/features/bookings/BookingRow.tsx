import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { IBooking } from '../../types/types';
import Menus from '../../ui/Menus';
import { HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
    cabinId,
    guestId,
  },
}: {
  booking: IBooking;
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate as string))
            ? 'Today'
            : formatDistanceFromNow(startDate as string)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate as string), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate as string), 'MMM dd yyyy')}
        </span>
      </Stacked>

      {status && (
        <Tag $type={statusToTagName[status as keyof typeof statusToTagName]}>
          {status.replace('-', ' ')}
        </Tag>
      )}

      <Amount>{formatCurrency(totalPrice as number)}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={bookingId.toString()} />
        <Menus.List id={bookingId.toString()}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See details
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
