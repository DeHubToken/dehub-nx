import * as dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: num({ default: 3333 }),
  NAME: str({ default: 'moralis-api' }),
  MORALIS_WEB3_API_KEY: str(),
  SUPABASE_API_URL: str(),
  SUPABASE_JWT_SECRET: str(),
  SUPABASE_PUBLIC_ANON_KEY: str(),
  SUPABASE_SERVICE_KEY: str(),
});
