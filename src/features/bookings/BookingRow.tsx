import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { format, isToday } from 'date-fns';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { IBooking } from '../../types/types';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

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
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: {
  booking: IBooking;
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout(bookingId);
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

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
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId.toString()} />
          <Menus.List id={bookingId.toString()}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={checkout}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )}

            <Modal.Open opens="delete-booking">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName={`booking #${bookingId || 'Unknown'}`}
              disabled={isDeletingBooking}
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
