'use client';

import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      {session ? (
        <Button variant="outline" onClick={handleSignOut}>
          Logout
        </Button>
      ) : (
        <Button variant="outline" onClick={handleSignIn}>
          Login
        </Button>
      )}
    </>
  );
};

export default AuthClientButton;
