'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import  Button  from "@/components/ui/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
