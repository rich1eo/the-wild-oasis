import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    async onSuccess() {
      toast.success('New cabin successfully created');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { isCreating, createCabin };
}
