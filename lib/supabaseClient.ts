import { Database } from '@/types/supabase';
import {
  createRouteHandlerClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseServer = () => {
  cookies().getAll();
  return createServerComponentClient<Database>({ cookies });
};

export const supabaseRouteHandler = () => {
  cookies().getAll();
  return createRouteHandlerClient<Database>({ cookies });
};
