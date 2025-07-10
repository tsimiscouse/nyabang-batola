"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import  Button  from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/Sampurna");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/Sampurna`,
      },
    });

    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/sampur-drone-sunset.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Login Card */}
      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-[#1a1a1a] text-white border border-[#333] shadow-2xl">
          <CardContent className="py-8 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Login to Your Account</h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-[#111] text-white border border-gray-600 focus-visible:ring-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="bg-[#111] text-white border border-gray-600 focus-visible:ring-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 transition"
              >
                Login
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#1a1a1a] px-2 text-gray-400">OR</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border border-gray-600 hover:bg-gray-800 text-white"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
