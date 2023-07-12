import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IUpdateSetting } from '../../types/types';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (editedSettingData: IUpdateSetting) =>
      updateSettingApi(editedSettingData),
    async onSuccess() {
      toast.success('Setting successfully updated');
      await queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { isUpdating, updateSetting };
}
