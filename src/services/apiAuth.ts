import { ILoginData } from '../types/types';
import supabase from './supabase';

export async function login({ email, password }: ILoginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}
