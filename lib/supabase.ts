import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabaseServer } from './supabaseClient';

export const getAllLessons = async () => {
  const supabase = supabaseServer();
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
