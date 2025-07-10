"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const navItems = ["Beranda", "Profil", "Publikasi", "Informasi", "Pelaporan"];
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log(data?.user);
      setUser(data?.user);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/Sampurna/auth/login";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center text-white bg-transparent">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <img src="/logo.png" alt="Logo Desa" className="w-10 h-10" />
        <span className="text-lg font-semibold whitespace-nowrap">Pemerintah Desa Sampurna</span>
      </div>

      <div className="flex items-center gap-8">
        <nav className="flex flex-wrap gap-6 text-lg md:text-xl font-semibold">
          {navItems.map((item, idx) => (
            <a key={idx} href="#" className="relative group">
              {item}
              <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Profile dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-white"
                />
                <span className="text-lg font-semibold">{user.user_metadata?.name || "User"}</span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-[#1a1a1a] text-white border border-gray-700 shadow-xl rounded-md mt-2 w-48">
              <DropdownMenuItem
                onClick={() => router.push("/Sampurna/article/drafts")}
                className="cursor-pointer hover:bg-[#333] px-4 py-2">
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-[#333] px-4 py-2">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer hover:bg-[#333] px-4 py-2 text-red-400"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
