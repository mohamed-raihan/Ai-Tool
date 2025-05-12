"use client";

import { useRouter } from "next/navigation";
import { removeAuth } from "@/app/lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeAuth();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
}
