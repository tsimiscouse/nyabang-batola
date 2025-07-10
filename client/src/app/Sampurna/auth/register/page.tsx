"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value, files } = e.target;
    if (id === "avatar" && files) {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `profile/avatar/${fileName}`;

    const { error } = await supabase.storage
      .from("thumbnails")
      .upload(filePath, file);

    if (error) {
      throw new Error("Upload failed");
    }

    const { data } = supabase.storage.from("thumbnails").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      let avatarUrl = "";

      if (formData.avatar) {
        avatarUrl = await uploadAvatar(formData.avatar);
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            avatar_url: avatarUrl,
            role : "user",
          },
          // redirectTo: `${window.location.origin}/dashboard`
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/Sampurna");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/Sampurna`,
      },
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/sampur-drone-sunset.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-[#1a1a1a] text-white border border-[#333] shadow-2xl">
          <CardContent className="py-8 px-6">
            <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

            <form className="space-y-4" onSubmit={handleRegister}>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div>
                <label className="text-sm mb-1 block">Profile Picture</label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
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
                onClick={handleGoogleSignIn}
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
