import { getLessonDetail, getPremContents } from '@/lib/supabase';
import { extractYouTubeVideoId } from '@/lib/utils';
import { Database } from '@/types/supabase';
import { Breadcrumbs, Link } from '@mui/material';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { YouTubeEmbed } from '@next/third-parties/google';

const LessonContentPage = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const id = params.id;
  const [lesson, video] = await Promise.all([
    await getLessonDetail(id, supabase),
    await getPremContents(id, supabase),
  ]);
  const videoId = extractYouTubeVideoId(video?.video_url!) as string;
  return (
    <div className=" w-full max-w-3xl mx-auto py-16 px-8">
      <Breadcrumbs>
        <Link href="/" color="inherit" underline="hover">
          HOME
        </Link>
        <Link href={`${id}`} color="inherit" underline="hover">
          {lesson?.title}
        </Link>
      </Breadcrumbs>
      <h1 className=" text-3xl mb-6">{lesson?.title}</h1>
      <p className=" mb-8">{lesson?.description}</p>
      <YouTubeEmbed height={400} videoid={videoId} />
    </div>
  );
};

export default LessonContentPage;
