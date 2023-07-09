import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = 'https://aylzsblrgkbndrgbteeq.supabase.co';
// I can't hide it from you anyway :D
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5bHpzYmxyZ2tibmRyZ2J0ZWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4OTQ1MTEsImV4cCI6MjAwNDQ3MDUxMX0.oWF03QRR7PRYqThzZQ-sX6cRFY1vtPkII5fHWZ3fDdk';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
