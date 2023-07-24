import { createClient } from '@supabase/supabase-js';

import { Database } from '../types/database';

export const supabaseUrl = 'https://aylzsblrgkbndrgbteeq.supabase.co';

const supabase = createClient<Database>(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_KEY
);

export default supabase;
