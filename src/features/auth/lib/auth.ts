import { getSupabaseClient } from '@/shared/lib/supabase';
import { createProfile } from '@/shared/api/profile';
import type { Profile } from '@/entities/profile/types';

type SignUpData = {
  email: string;
  password: string;
  username: string;
  fullName: string;
};

type SignInData = {
  email: string;
  password: string;
};

export async function signUp({ email, password, username, fullName }: SignUpData): Promise<Profile> {
  console.log('signUp request', { email, username, fullName });
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    console.log('signUp error', error);
    try {
      console.log('signUp error JSON', JSON.stringify(error, null, 2));
    } catch (jsonError) {
      console.log('signUp error JSON stringify failed', jsonError);
    }
    throw error ?? new Error('Unable to create auth user');
  }

  const profile = await createProfile({
    username,
    fullName,
    authUserId: data.user.id,
  });

  if (!profile) {
    throw new Error('Unable to create user profile');
  }

  return profile;
}

export async function signIn({ email, password }: SignInData) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    throw error ?? new Error('Unable to sign in');
  }

  return data.session;
}

export async function signOut() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data } = await supabase.auth.getSession();
  return data?.session?.user ?? null;
}
