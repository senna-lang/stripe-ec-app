import { Database } from '@/types/supabase';
import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getAllLessons = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from('lesson').select('*');
  return data;
};

export const getLessonDetail = async (id: number,supabase:SupabaseClient) => {
  const { data } = await supabase
    .from('lesson')
    .select('*')
    .eq('id', id)
    .single();
  return data;
};
