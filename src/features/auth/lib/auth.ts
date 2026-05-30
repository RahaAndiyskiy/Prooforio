import { getSupabaseClient } from '@/shared/lib/supabase';

export function signInWithGoogle() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  return supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function getUserSession() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  return supabase.auth.getSession();
}

export function getAuthClient() {
  return getSupabaseClient()?.auth ?? null;
}
