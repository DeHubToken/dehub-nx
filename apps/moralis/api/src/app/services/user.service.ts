import { SupabaseUserInsert } from '@dehub/shared/model';
import { supabase } from './supabase.service';

// Create
export const createUser = async (payload: SupabaseUserInsert) =>
  await supabase.from('users').insert(payload).select().single();

// Read
export const getUsers = async () => await supabase.from('users').select();

export const getUserByProfileId = async (profileId: string) =>
  await supabase
    .from('users')
    .select()
    .eq('moralis_provider_id', profileId)
    .single();
