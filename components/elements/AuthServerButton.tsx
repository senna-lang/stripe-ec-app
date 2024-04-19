import { supabaseServer } from '@/lib/supabaseClient';
import AuthClientButton from './AuthClientButton';

const AuthServerButton = async () => {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getUser();
  const session = user.user;
  return <AuthClientButton session={session} />;
};

export default AuthServerButton;
