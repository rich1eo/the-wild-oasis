import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ILoginData } from '../../types/types';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: ILoginData) =>
      loginApi({ email, password }),
    onSuccess: user => {
      console.log(user);
      navigate('/dashboard');
    },
    onError: error => {
      console.error('ERROR', error);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
