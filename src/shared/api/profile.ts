import { getSupabaseClient } from '@/shared/lib/supabase';
import type { Profile } from '@/entities/profile/types';

type ProfileRow = {
  id: string;
  username: string;
  full_name: string;
  auth_user_id: string | null;
};

function mapProfile(row: ProfileRow): Profile {
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

export async function getProfileById(profileId: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, auth_user_id')
    .eq('id', profileId)
    .maybeSingle();

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
    .insert({
      username,
      full_name: fullName,
      auth_user_id: authUserId,
    })
    .select()
    .single();

  if (error || !data) {
    return null;
  }

  return mapProfile(data as ProfileRow);
}
