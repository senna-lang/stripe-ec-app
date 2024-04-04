import { getLessonDetail } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

const LessonContentPage = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const id = params.id;
  const lessonContent = await getLessonDetail(id, supabase);
  return (
    <div className=" w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className=" text-3xl mb-6">{lessonContent?.title}</h1>
      <p className=" mb-8">{lessonContent?.description}</p>
    </div>
  );
};

export default LessonContentPage;
