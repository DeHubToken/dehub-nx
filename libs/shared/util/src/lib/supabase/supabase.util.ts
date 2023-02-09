import { Database, Supabase } from '@dehub/shared/model';
import { createClient } from '@supabase/supabase-js';

export const getSupabase = (
  supabaseApiUrl: string,
  supabaseKey: string,
  token?: string | null
): Supabase =>
  createClient<Database>(supabaseApiUrl, supabaseKey, {
    global: {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  });
