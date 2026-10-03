"use client";
import useAuthStore from "@/imports/auth/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [user, router]);

  return <div>welcome {user?.name}</div>;
}
