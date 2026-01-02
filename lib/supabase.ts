import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jszdvvdnrflwgtqqstnr.supabase.co';
const supabaseAnonKey = 'sb_publishable_GO0xJ0AtMDEl2FYtuNztBQ_EnnCwFwY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
