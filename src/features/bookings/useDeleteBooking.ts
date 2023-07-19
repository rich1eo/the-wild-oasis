import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: async () => {
      toast.success('Booking successfully deleted');
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: err => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { isDeletingBooking, deleteBooking };
}
