'use client';

import  Button  from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  return (
    <div className="mt-6">
      <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleLogin}>
        <FcGoogle className="text-xl" />
        Login with Google
      </Button>
    </div>
  );
}
