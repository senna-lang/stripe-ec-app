import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAllLessons } from '@/lib/supabase';
import { Button, Rating, Skeleton } from '@mui/material';

export default async function Home() {
  const lessons = await getAllLessons();
  return (
    <main className=" w-full max-w-3xl mx-auto my-16 px-2">
      <div className=" flex flex-col gap-2">
        {lessons ? (
          lessons.map(lesson => (
            <Link href={`/${lesson.id}`} key={lesson.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>{lesson.description}</CardContent>
                <CardContent>
                  <Rating value={null} />
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <>
            <Skeleton
              variant="rectangular"
              width="auto"
              height={150}
              className=" rounded-md"
            />
            <Skeleton
              variant="rectangular"
              width="auto"
              height={150}
              className=" rounded-md"
            />
          </>
        )}
        <Button variant="contained">text</Button>
      </div>
    </main>
  );
}
