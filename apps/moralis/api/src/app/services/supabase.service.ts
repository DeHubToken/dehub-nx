import { Database } from '@dehub/shared/model';
import { createClient } from '@supabase/supabase-js';
import { env } from '../../config';

export const supabase = createClient<Database>(
  env.SUPABASE_API_URL,
  env.SUPABASE_SERVICE_KEY
);
