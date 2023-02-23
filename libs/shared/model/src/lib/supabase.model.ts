import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './website-database.model';
export interface RequestMessageRequest {
  address: string;
  chain: string;
  networkType: 'evm';
}

export interface RequestMessageResponse {
  /** Metamask Signature message */
  message: string;
}

export interface VerifyMessageRequest {
  networkType: 'evm';
  signature: string;
  message: string;
}

export interface AuthenticateRequest {
  token: string | null;
}

export interface AuthenticateResponse {
  user?: SupabaseUser;
  error?: string;
}

export interface VerifyMessageResponse {
  /** Logged in user */
  user: SupabaseUser;
  /** Supabase JWT */
  token: string;
}

export const SupabaseJwt = 'token';

export type Supabase = SupabaseClient<Database>;

// User
export type SupabaseTableUsers = Database['public']['Tables']['users'];

export type SupabaseUser = SupabaseTableUsers['Row'];
export type SupabaseUserInsert = SupabaseTableUsers['Insert'];
