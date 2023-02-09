import {
  Supabase,
  SupabaseUser,
  SupabaseUserInsert,
} from '@dehub/shared/model';
import { shortenAddress } from '../address.util';

// Create
export const createUser = async (
  supabase: Supabase,
  payload: SupabaseUserInsert
) => await supabase.from('users').insert(payload).select().single();

// Read
export const getUsers = async (supabase: Supabase) =>
  await supabase.from('users').select();

export const getUserByProfileId = async (
  supabase: Supabase,
  profileId: string
) =>
  await supabase
    .from('users')
    .select()
    .eq('moralis_provider_id', profileId)
    .single();

// Helpers
export const getUserAddress = (
  { metadata }: SupabaseUser,
  shorten = true
): string | undefined => {
  const address = (metadata as { [key: string]: string })['address'];
  return metadata !== null
    ? shorten
      ? shortenAddress(address)
      : address
    : undefined;
};
