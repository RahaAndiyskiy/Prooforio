import { getSupabaseClient } from '@/shared/lib/supabase';
import type { Profile } from '@/entities/profile/types';

function mapProfile(row: any): Profile {
  return {
    id: row.id,
    username: row.username,
    fullName: row.full_name,
  };
}

export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name')
    .ilike('username', username)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProfile(data);
}

export async function getProfileByEmail(email: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name')
    .eq('email', email)
    .single();

  if (error || !data) {
    return null;
  }

  return mapProfile(data);
}

export async function createProfile({
  username,
  fullName,
  email,
}: {
  username: string;
  fullName: string;
  email: string;
}): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert({ username, full_name: fullName, email })
    .select('id, username, full_name')
    .single();

  if (error || !data) {
    return null;
  }

  return mapProfile(data);
}
