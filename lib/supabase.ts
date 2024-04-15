import { Database } from '@/types/supabase';
import {
  SupabaseClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getAllLessons = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from('lesson').select('*');
  return data;
};

export const getLessonDetail = async (
  id: number,
  supabase: SupabaseClient<Database>
) => {
  const { data } = await supabase
    .from('lesson')
    .select('*')
    .eq('id', id)
    .single();
  return data;
};

export const getPremContents = async (
  id: number,
  supabase: SupabaseClient<Database>
) => {
  const { data } = await supabase
    .from('premium_contents')
    .select('video_url')
    .eq('id', id)
    .single();
  return data;
};
export const getProfile = async (supabase: SupabaseClient<Database>) => {
  const { data } = await supabase.from('profile').select('*').single();
  return data;
};
