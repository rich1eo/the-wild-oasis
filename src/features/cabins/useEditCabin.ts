import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INewCabin } from '../../types/types';
import { createEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: INewCabin;
      id: number;
    }) => createEditCabin(newCabinData, id),
    async onSuccess() {
      toast.success('Cabin successfully edited');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { isEditing, editCabin };
}
