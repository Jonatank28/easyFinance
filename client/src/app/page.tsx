'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }

  }, [isLoaded, isSignedIn])

  return null
}
