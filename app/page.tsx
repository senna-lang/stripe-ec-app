import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAllLessons } from '@/lib/supabase';
import { Button } from '@mui/material';

export default async function Home() {
  const lessons = await getAllLessons();
  return (
    <main className=" w-full max-w-3xl mx-auto my-16 px-2">
      <div className=" flex flex-col gap-2">
        {lessons?.map(lesson => (
          <Link href={`/${lesson.id}`} key={lesson.id}>
            <Card>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent>{lesson.description}</CardContent>
            </Card>
          </Link>
        ))}
        <Button variant="contained">text</Button>
      </div>
    </main>
  );
}
