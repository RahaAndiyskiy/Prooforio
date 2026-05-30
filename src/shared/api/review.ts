import { getSupabaseClient } from '@/shared/lib/supabase';
import type { Review } from '@/entities/review/types';

function mapReview(row: any): Review {
  return {
    id: row.id,
    profileId: row.profile_id,
    author: row.author,
    text: row.text,
    rating: Number(row.rating),
    createdAt: row.created_at,
  };
}

export async function getReviewsByProfileId(profileId: string): Promise<Review[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('id, profile_id, author, text, rating, created_at')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapReview);
}

export async function createReview({
  profileId,
  author,
  text,
  rating,
}: {
  profileId: string;
  author: string;
  text: string;
  rating: number;
}): Promise<Review | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert({ profile_id: profileId, author, text, rating })
    .select('id, profile_id, author, text, rating, created_at')
    .single();

  if (error || !data) {
    return null;
  }

  return mapReview(data);
}
