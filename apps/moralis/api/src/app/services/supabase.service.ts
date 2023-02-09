import { getSupabase } from '@dehub/shared/utils';
import { env } from '../../config';

export const supabase = getSupabase(
  env.SUPABASE_API_URL,
  env.SUPABASE_SERVICE_KEY
);
