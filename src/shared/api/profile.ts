import { getSupabaseClient } from '@/shared/lib/supabase';
import type { Profile } from '@/entities/profile/types';

function mapProfile(row: any): Profile {
  return {
    id: row.id,
    username: row.username,
    fullName: row.full_name,
    authUserId: row.auth_user_id || undefined,
  };
}

export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, auth_user_id')
    .ilike('username', username)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProfile(data);
}

export async function getProfileByAuthUserId(authUserId: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, auth_user_id')
    .eq('auth_user_id', authUserId)
    .single();

  if (error || !data) {
    return null;
  }

  return mapProfile(data);
}

export async function createProfile({
  username,
  fullName,
  authUserId,
}: {
  username: string;
  fullName: string;
  authUserId: string;
}): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert({ username, full_name: fullName, auth_user_id: authUserId })
    .select('id, username, full_name, auth_user_id')
    .single();

  if (error) {
    console.log('createProfile error', error);
    console.log('createProfile error JSON', JSON.stringify(error, null, 2));
  }

  if (error || !data) {
    return null;
  }

  return mapProfile(data);
}
