import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Row from '../../ui/Row';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import Heading from '../../ui/Heading';
import ButtonText from '../../ui/ButtonText';
import BookingDataBox from './BookingDataBox';
import ButtonGroup from '../../ui/ButtonGroup';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useBooking } from './useBooking';
import { IBookingDetails } from '../../types/types';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  const { isCheckingOut, checkout } = useCheckout(booking?.id as number);
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag
            $type={
              statusToTagName[booking!.status as keyof typeof statusToTagName]
            }
          >
            {booking!.status!.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as IBookingDetails} />

      <ButtonGroup>
        {booking?.status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${String(booking?.id)}`)}>
            Check In
          </Button>
        )}

        {booking?.status === 'checked-in' && (
          <Button onClick={() => checkout()} disabled={isCheckingOut}>
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button $variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName={`booking #${booking?.id || 'unknown'}`}
              disabled={isDeletingBooking}
              onConfirm={() => {
                deleteBooking(booking?.id as number, {
                  onSettled: () => navigate(-1),
                });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
