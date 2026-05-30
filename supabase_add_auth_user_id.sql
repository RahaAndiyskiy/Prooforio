-- Add auth_user_id column to profiles and link it to Supabase Auth users
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS auth_user_id uuid;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_auth_user_id_idx ON profiles(auth_user_id);

ALTER TABLE profiles
ADD CONSTRAINT IF NOT EXISTS profiles_auth_user_id_fkey
FOREIGN KEY (auth_user_id) REFERENCES auth.users(id);
