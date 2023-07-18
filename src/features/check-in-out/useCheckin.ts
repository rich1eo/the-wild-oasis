import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBooking } from '../../services/apiBookings';

export function useCheckin(bookingId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast?: {
        hasBreakfast: boolean;
        extrasPrice: number;
        totalPrice: number;
      };
    }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess(data) {
      toast.success(`Booking #${data.id} successfully checked in`);
      void queryClient.invalidateQueries({
        queryKey: ['booking', bookingId.toString()],
      });
      navigate('/');
    },

    onError() {
      toast.error('There was an error while checking in');
    },
  });

  return { checkin, isCheckingIn };
}
